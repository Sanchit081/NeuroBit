const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  name: {
    type: String,
    trim: true,
    default: ''
  },
  interests: {
    type: [String],
    default: []
  },
  source: {
    type: String,
    enum: ['website', 'gumroad', 'social_media', 'referral'],
    default: 'website'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  lastEmailSent: {
    type: Date,
    default: null
  },
  tags: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

// Index for faster queries
subscriberSchema.index({ email: 1 });
subscriberSchema.index({ subscribedAt: -1 });
subscriberSchema.index({ source: 1 });

// Virtual for subscriber count
subscriberSchema.virtual('daysSinceSubscribed').get(function() {
  return Math.floor((Date.now() - this.subscribedAt) / (1000 * 60 * 60 * 24));
});

// Method to update last email sent
subscriberSchema.methods.updateLastEmailSent = function() {
  this.lastEmailSent = new Date();
  return this.save();
};

// Static method to get subscriber stats
subscriberSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        active: { $sum: { $cond: ['$isActive', 1, 0] } },
        thisMonth: {
          $sum: {
            $cond: [
              { $gte: ['$subscribedAt', new Date(new Date().getFullYear(), new Date().getMonth(), 1)] },
              1,
              0
            ]
          }
        }
      }
    }
  ]);
  
  return stats[0] || { total: 0, active: 0, thisMonth: 0 };
};

module.exports = mongoose.model('Subscriber', subscriberSchema); 