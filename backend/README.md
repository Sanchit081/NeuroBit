# NeuroBit Backend API

A complete Express.js backend for the NeuroBit digital product business, featuring email capture, product management, admin dashboard, and feedback collection.

## 🚀 Features

- **📧 Email Management**: Capture, store, and manage email subscribers
- **📦 Product Management**: CRUD operations for digital products
- **🔐 Admin Dashboard**: Secure admin panel with authentication
- **💬 Feedback System**: Collect and manage user testimonials
- **📊 Analytics**: Subscriber and product statistics
- **📮 Email Notifications**: Welcome emails and admin alerts
- **🛡️ Security**: Rate limiting, CORS, input validation

## 🛠️ Tech Stack

- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ORM**: Mongoose
- **Email**: Nodemailer
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate limiting

## 📦 Installation

1. **Clone and navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp env.example .env
   # Edit .env with your actual values
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

## 🔧 Environment Setup

### Required Variables

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/neurobit

# Admin Authentication
ADMIN_TOKEN=your-secure-token-here
ADMIN_EMAIL=your-email@example.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Optional Variables

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# For development testing
ETHEREAL_USER=test@example.com
ETHEREAL_PASS=testpass
```

## 📡 API Endpoints

### 🔐 Authentication
All admin endpoints require the `ADMIN_TOKEN` in headers:
```
Authorization: Bearer your-admin-token-here
```

### 📧 Email Subscription

#### POST `/api/subscribe`
Subscribe to newsletter
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "interests": ["productivity", "ai-tools"],
  "source": "website"
}
```

#### GET `/api/subscribe/verify/:email`
Verify subscription status

#### DELETE `/api/subscribe/:email`
Unsubscribe from newsletter

### 📦 Products

#### GET `/api/products`
Get all active products
```
Query params: category, popular, limit
```

#### GET `/api/products/:slug`
Get single product

#### POST `/api/products` (Admin)
Create new product
```json
{
  "name": "ResumeGPT",
  "slug": "resumegpt",
  "description": "AI-powered resume enhancement",
  "price": 99,
  "category": "productivity",
  "gumroadLink": "https://gumroad.com/l/resumegpt"
}
```

### 🔐 Admin Dashboard

#### GET `/api/admin/dashboard`
Get dashboard overview with stats

#### GET `/api/admin/subscribers`
Get all subscribers with pagination
```
Query params: page, limit, source, active
```

#### GET `/api/admin/subscribers/export`
Export subscribers as CSV

#### GET `/api/admin/stats`
Get detailed analytics
```
Query params: period (default: 30 days)
```

### 💬 Feedback

#### POST `/api/feedback`
Submit feedback/testimonial
```json
{
  "email": "user@example.com",
  "message": "Amazing product!",
  "rating": 5,
  "product": "ResumeGPT",
  "type": "testimonial"
}
```

#### GET `/api/feedback/testimonials`
Get public testimonials

## 🗄️ Database Models

### Subscriber
```javascript
{
  email: String (required, unique),
  name: String,
  interests: [String],
  source: String (website, gumroad, social_media, referral),
  isActive: Boolean,
  subscribedAt: Date,
  tags: [String]
}
```

### Product
```javascript
{
  name: String (required),
  slug: String (required, unique),
  description: String (required),
  price: Number (required),
  category: String (productivity, content, education, business),
  gumroadLink: String (required),
  notionLink: String,
  isActive: Boolean,
  isPopular: Boolean,
  sales: Number,
  revenue: Number,
  rating: Number
}
```

## 🚀 Deployment

### Render (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Railway
1. Connect repository
2. Add environment variables
3. Deploy

### Vercel
1. Install Vercel CLI
2. Run `vercel --prod`

## 🔗 Frontend Integration

Update your React frontend to use the API:

```javascript
// Subscribe to newsletter
const subscribe = async (email, name) => {
  const response = await fetch('http://localhost:5000/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name })
  });
  return response.json();
};

// Get products
const getProducts = async () => {
  const response = await fetch('http://localhost:5000/api/products');
  return response.json();
};
```

## 📊 Health Check

Test your API:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "NeuroBit API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🛡️ Security Features

- **Rate Limiting**: 100 requests per 15 minutes
- **CORS**: Configured for your frontend domain
- **Input Validation**: All inputs validated
- **Helmet**: Security headers
- **Admin Authentication**: Token-based admin access

## 📈 Monitoring

The API includes:
- Request logging
- Error tracking
- Performance monitoring
- Database connection status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions:
- Check the API documentation
- Review the health check endpoint
- Check server logs for errors

---

**Built with ❤️ for NeuroBit by SanchitVerse** 