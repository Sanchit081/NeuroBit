const express = require('express');
const { body, validationResult } = require('express-validator');
const Subscriber = require('../models/Subscriber');
const sendWelcomeEmail = require('../utils/emailService');
const { addSubscriberToNotion } = require('../utils/notion');

const router = express.Router();

// POST /api/subscribe - Email signup
router.post('/', [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array'),
  body('source')
    .optional()
    .isIn(['website', 'gumroad', 'social_media', 'referral'])
    .withMessage('Invalid source')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, name, interests, source } = req.body;

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed to our newsletter'
      });
    }

    const subscriber = new Subscriber({
      email,
      name: name || '',
      interests: interests || [],
      source: source || 'website'
    });

    await subscriber.save();

    // Notion Integration
    try {
      await addSubscriberToNotion({
        name: name || '',
        email,
        interests: interests || [],
        source: source || 'website'
      });
    } catch (notionError) {
      console.error('Notion integration failed:', notionError);
    }

    // Send welcome email
    try {
      await sendWelcomeEmail(email, name);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to NeuroBit newsletter!',
      data: {
        email: subscriber.email,
        name: subscriber.name,
        subscribedAt: subscriber.subscribedAt
      }
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/subscribe/verify/:email - Verify subscription
router.get('/verify/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const subscriber = await Subscriber.findOne({ email });
    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }
    res.json({
      success: true,
      data: {
        email: subscriber.email,
        name: subscriber.name,
        isActive: subscriber.isActive,
        subscribedAt: subscriber.subscribedAt
      }
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify subscription'
    });
  }
});

// DELETE /api/subscribe/:email - Unsubscribe
router.delete('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const subscriber = await Subscriber.findOne({ email });
    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }
    subscriber.isActive = false;
    await subscriber.save();
    res.json({
      success: true,
      message: 'Successfully unsubscribed from NeuroBit newsletter'
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe'
    });
  }
});

module.exports = router;
