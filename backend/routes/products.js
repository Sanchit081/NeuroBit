const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');

const router = express.Router();

// GET /api/products - Get all active products
router.get('/', async (req, res) => {
  try {
    const { category, popular, limit } = req.query;
    
    let query = { isActive: true };
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter popular products
    if (popular === 'true') {
      query.isPopular = true;
    }
    
    // Build query
    let productsQuery = Product.find(query).sort({ createdAt: -1 });
    
    // Apply limit
    if (limit) {
      productsQuery = productsQuery.limit(parseInt(limit));
    }
    
    const products = await productsQuery;
    
    res.json({
      success: true,
      data: products,
      count: products.length
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

// GET /api/products/:slug - Get single product
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const product = await Product.findOne({ slug, isActive: true });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product'
    });
  }
});

// POST /api/products - Create new product (Admin only)
router.post('/', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('slug').trim().isLength({ min: 2, max: 50 }).withMessage('Slug must be between 2 and 50 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').isIn(['productivity', 'content', 'education', 'business']).withMessage('Invalid category'),
  body('gumroadLink').isURL().withMessage('Gumroad link must be a valid URL')
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

    const {
      name,
      slug,
      description,
      price,
      originalPrice,
      category,
      features,
      gumroadLink,
      notionLink,
      coverImage,
      isPopular,
      tags
    } = req.body;

    // Check if product with slug already exists
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'Product with this slug already exists'
      });
    }

    // Create new product
    const product = new Product({
      name,
      slug,
      description,
      price,
      originalPrice,
      category,
      features: features || [],
      gumroadLink,
      notionLink: notionLink || '',
      coverImage: coverImage || '',
      isPopular: isPopular || false,
      tags: tags || []
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product'
    });
  }
});

// PUT /api/products/:slug - Update product (Admin only)
router.put('/:slug', [
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('description').optional().trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  body('category').optional().isIn(['productivity', 'content', 'education', 'business']).withMessage('Invalid category'),
  body('gumroadLink').optional().isURL().withMessage('Gumroad link must be a valid URL')
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

    const { slug } = req.params;
    const updateData = req.body;

    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update product
    Object.assign(product, updateData);
    await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product'
    });
  }
});

// DELETE /api/products/:slug - Delete product (Admin only)
router.delete('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Soft delete - set isActive to false
    product.isActive = false;
    await product.save();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product'
    });
  }
});

// GET /api/products/stats - Get product statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Product.getStats();
    
    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Get product stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product statistics'
    });
  }
});

module.exports = router; 