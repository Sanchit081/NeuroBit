const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Product slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  category: {
    type: String,
    enum: ['productivity', 'content', 'education', 'business'],
    required: true
  },
  features: {
    type: [String],
    default: []
  },
  gumroadLink: {
    type: String,
    required: [true, 'Gumroad link is required'],
    validate: {
      validator: function(v) {
        return /^https:\/\/gumroad\.com\/l\/.+/.test(v);
      },
      message: 'Please provide a valid Gumroad link'
    }
  },
  notionLink: {
    type: String,
    default: ''
  },
  coverImage: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  sales: {
    type: Number,
    default: 0
  },
  revenue: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  downloads: {
    type: Number,
    default: 0
  },
  tags: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for faster queries
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isPopular: 1 });

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
  return `₹${this.price}`;
});

// Method to update sales and revenue
productSchema.methods.updateSales = function(quantity = 1, amount = this.price) {
  this.sales += quantity;
  this.revenue += amount;
  this.updatedAt = new Date();
  return this.save();
};

// Static method to get product stats
productSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $match: { isActive: true }
    },
    {
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
        totalSales: { $sum: '$sales' },
        totalRevenue: { $sum: '$revenue' },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  
  return stats[0] || { totalProducts: 0, totalSales: 0, totalRevenue: 0, avgRating: 0 };
};

// Pre-save middleware to update timestamps
productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Product', productSchema); 