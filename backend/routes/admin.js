const express = require('express');
const Subscriber = require('../models/Subscriber');
const Product = require('../models/Product');

const router = express.Router();

// Simple admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  const authToken = req.headers.authorization?.split(' ')[1] || req.query.authToken;
  
  if (!authToken || authToken !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized access'
    });
  }
  
  next();
};

// GET /api/admin/dashboard - Dashboard overview
router.get('/dashboard', authenticateAdmin, async (req, res) => {
  try {
    // Get subscriber stats
    const subscriberStats = await Subscriber.getStats();
    
    // Get product stats
    const productStats = await Product.getStats();
    
    // Get recent subscribers
    const recentSubscribers = await Subscriber.find({ isActive: true })
      .sort({ subscribedAt: -1 })
      .limit(10)
      .select('email name source subscribedAt');
    
    // Get recent products
    const recentProducts = await Product.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name slug price sales revenue');
    
    res.json({
      success: true,
      data: {
        subscribers: subscriberStats,
        products: productStats,
        recentSubscribers,
        recentProducts,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data'
    });
  }
});

// GET /api/admin/subscribers - Get all subscribers
router.get('/subscribers', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 50, source, active } = req.query;
    
    let query = {};
    
    // Filter by source
    if (source) {
      query.source = source;
    }
    
    // Filter by active status
    if (active !== undefined) {
      query.isActive = active === 'true';
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const subscribers = await Subscriber.find(query)
      .sort({ subscribedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');
    
    const total = await Subscriber.countDocuments(query);
    
    res.json({
      success: true,
      data: subscribers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscribers'
    });
  }
});

// GET /api/admin/subscribers/export - Export subscribers as CSV
router.get('/subscribers/export', authenticateAdmin, async (req, res) => {
  try {
    const subscribers = await Subscriber.find({ isActive: true })
      .sort({ subscribedAt: -1 })
      .select('email name interests source subscribedAt');
    
    // Create CSV content
    const csvHeader = 'Email,Name,Interests,Source,Subscribed At\n';
    const csvRows = subscribers.map(sub => {
      const interests = sub.interests.join('; ');
      const date = sub.subscribedAt.toISOString().split('T')[0];
      return `"${sub.email}","${sub.name}","${interests}","${sub.source}","${date}"`;
    }).join('\n');
    
    const csvContent = csvHeader + csvRows;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="neurobit-subscribers.csv"');
    res.send(csvContent);

  } catch (error) {
    console.error('Export subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export subscribers'
    });
  }
});

// PUT /api/admin/subscribers/:id - Update subscriber
router.put('/subscribers/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const subscriber = await Subscriber.findById(id);
    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }
    
    Object.assign(subscriber, updateData);
    await subscriber.save();
    
    res.json({
      success: true,
      message: 'Subscriber updated successfully',
      data: subscriber
    });

  } catch (error) {
    console.error('Update subscriber error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update subscriber'
    });
  }
});

// DELETE /api/admin/subscribers/:id - Delete subscriber
router.delete('/subscribers/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const subscriber = await Subscriber.findById(id);
    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }
    
    await Subscriber.findByIdAndDelete(id);
    
    res.json({
      success: true,
      message: 'Subscriber deleted successfully'
    });

  } catch (error) {
    console.error('Delete subscriber error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete subscriber'
    });
  }
});

// GET /api/admin/products - Get all products (admin view)
router.get('/products', authenticateAdmin, async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.json({
      success: true,
      data: products,
      count: products.length
    });

  } catch (error) {
    console.error('Get admin products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

// GET /api/admin/stats - Get detailed statistics
router.get('/stats', authenticateAdmin, async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // Subscriber stats for period
    const subscriberStats = await Subscriber.aggregate([
      {
        $match: {
          subscribedAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$subscribedAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    // Source breakdown
    const sourceStats = await Subscriber.aggregate([
      {
        $group: {
          _id: "$source",
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Product performance
    const productStats = await Product.aggregate([
      {
        $match: { isActive: true }
      },
      {
        $project: {
          name: 1,
          sales: 1,
          revenue: 1,
          rating: 1
        }
      },
      {
        $sort: { revenue: -1 }
      }
    ]);
    
    res.json({
      success: true,
      data: {
        subscriberGrowth: subscriberStats,
        sourceBreakdown: sourceStats,
        productPerformance: productStats,
        period: `${days} days`
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

module.exports = router; 