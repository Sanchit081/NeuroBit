const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Simple in-memory storage for feedback (replace with MongoDB model in production)
let feedbackStorage = [];

// POST /api/feedback - Submit feedback
router.post('/', [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('product')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),
  body('type')
    .optional()
    .isIn(['testimonial', 'bug_report', 'feature_request', 'general'])
    .withMessage('Invalid feedback type')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, message, rating, product, type } = req.body;

    // Create feedback object
    const feedback = {
      id: Date.now().toString(),
      email,
      message,
      rating: rating || null,
      product: product || 'General',
      type: type || 'general',
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    // Store feedback (in production, save to MongoDB)
    feedbackStorage.push(feedback);

    // Optional: Send notification email to admin
    if (process.env.ADMIN_EMAIL) {
      try {
        // Send notification email (implement email service)
        console.log('New feedback received:', feedback);
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback! We\'ll review it shortly.',
      data: {
        id: feedback.id,
        submittedAt: feedback.submittedAt
      }
    });

  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/feedback/testimonials - Get public testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    // Filter approved testimonials with ratings
    const testimonials = feedbackStorage
      .filter(feedback => 
        feedback.type === 'testimonial' && 
        feedback.status === 'approved' && 
        feedback.rating
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, parseInt(limit))
      .map(feedback => ({
        id: feedback.id,
        message: feedback.message,
        rating: feedback.rating,
        product: feedback.product,
        submittedAt: feedback.submittedAt
      }));

    res.json({
      success: true,
      data: testimonials,
      count: testimonials.length
    });

  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testimonials'
    });
  }
});

// GET /api/feedback/stats - Get feedback statistics (Admin only)
router.get('/stats', (req, res) => {
  try {
    const authToken = req.headers.authorization?.split(' ')[1] || req.query.authToken;
    
    if (!authToken || authToken !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access'
      });
    }

    const total = feedbackStorage.length;
    const testimonials = feedbackStorage.filter(f => f.type === 'testimonial').length;
    const bugReports = feedbackStorage.filter(f => f.type === 'bug_report').length;
    const featureRequests = feedbackStorage.filter(f => f.type === 'feature_request').length;
    const pending = feedbackStorage.filter(f => f.status === 'pending').length;
    const approved = feedbackStorage.filter(f => f.status === 'approved').length;

    // Calculate average rating
    const ratedFeedback = feedbackStorage.filter(f => f.rating);
    const avgRating = ratedFeedback.length > 0 
      ? ratedFeedback.reduce((sum, f) => sum + f.rating, 0) / ratedFeedback.length 
      : 0;

    res.json({
      success: true,
      data: {
        total,
        testimonials,
        bugReports,
        featureRequests,
        pending,
        approved,
        avgRating: Math.round(avgRating * 10) / 10,
        totalRated: ratedFeedback.length
      }
    });

  } catch (error) {
    console.error('Get feedback stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback statistics'
    });
  }
});

// GET /api/feedback/all - Get all feedback (Admin only)
router.get('/all', (req, res) => {
  try {
    const authToken = req.headers.authorization?.split(' ')[1] || req.query.authToken;
    
    if (!authToken || authToken !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access'
      });
    }

    const { page = 1, limit = 20, status, type } = req.query;
    
    let filteredFeedback = [...feedbackStorage];
    
    // Filter by status
    if (status) {
      filteredFeedback = filteredFeedback.filter(f => f.status === status);
    }
    
    // Filter by type
    if (type) {
      filteredFeedback = filteredFeedback.filter(f => f.type === type);
    }
    
    // Sort by submission date
    filteredFeedback.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const paginatedFeedback = filteredFeedback.slice(skip, skip + parseInt(limit));
    
    res.json({
      success: true,
      data: paginatedFeedback,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredFeedback.length,
        pages: Math.ceil(filteredFeedback.length / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get all feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback'
    });
  }
});

// PUT /api/feedback/:id/status - Update feedback status (Admin only)
router.put('/:id/status', (req, res) => {
  try {
    const authToken = req.headers.authorization?.split(' ')[1] || req.query.authToken;
    
    if (!authToken || authToken !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access'
      });
    }

    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be pending, approved, or rejected'
      });
    }
    
    const feedback = feedbackStorage.find(f => f.id === id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }
    
    feedback.status = status;
    feedback.updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      message: 'Feedback status updated successfully',
      data: feedback
    });

  } catch (error) {
    console.error('Update feedback status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update feedback status'
    });
  }
});

module.exports = router; 