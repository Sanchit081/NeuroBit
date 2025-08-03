
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 NeuroBit Backend Setup\n');

// Function to create .env file
function createEnvFile() {
  const envContent = `# NeuroBit Backend Configuration

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://sainisanchit01:<db_password>@cluster0.jc3eq9x.mongodb.net/neurobit?retryWrites=true&w=majority&appName=Cluster0

# Admin Authentication
ADMIN_TOKEN=neurobit-admin-2024-secure-token
ADMIN_EMAIL=sainisanchit01@gmail.com

# Email Configuration (for welcome emails and notifications)
EMAIL_SERVICE=gmail
EMAIL_USER=sainisanchit01@gmail.com
EMAIL_PASS=your-app-password-here

# For development testing (Ethereal Email)
ETHEREAL_USER=test@example.com
ETHEREAL_PASS=testpass

# Security
JWT_SECRET=neurobit-jwt-secret-key-2024
COOKIE_SECRET=neurobit-cookie-secret-2024

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
`;

  fs.writeFileSync(path.join(__dirname, '.env'), envContent);
  console.log('✅ .env file created successfully!');
}

// Function to test MongoDB connection
async function testMongoConnection() {
  try {
    const mongoose = require('mongoose');
    require('dotenv').config();
    
    console.log('🔗 Testing MongoDB connection...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connection successful!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    
    await mongoose.disconnect();
    console.log('🔌 Connection closed for testing');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\n💡 Please check:');
    console.log('1. Your MongoDB password in the connection string');
    console.log('2. Network connectivity');
    console.log('3. MongoDB Atlas IP whitelist');
  }
}

// Main setup function
async function setup() {
  try {
    // Check if .env exists
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      console.log('📁 .env file already exists');
      rl.question('Do you want to overwrite it? (y/N): ', (answer) => {
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
          createEnvFile();
          rl.question('\n🔑 Enter your MongoDB password: ', async (password) => {
            await updateMongoPassword(password);
            await testMongoConnection();
            rl.close();
          });
        } else {
          console.log('⏭️ Skipping .env creation');
          rl.close();
        }
      });
    } else {
      createEnvFile();
      rl.question('\n🔑 Enter your MongoDB password: ', async (password) => {
        await updateMongoPassword(password);
        await testMongoConnection();
        rl.close();
      });
    }
  } catch (error) {
    console.error('❌ Setup failed:', error);
    rl.close();
  }
}

// Function to update MongoDB password in .env
async function updateMongoPassword(password) {
  try {
    const envPath = path.join(__dirname, '.env');
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Replace the placeholder with actual password
    envContent = envContent.replace('<db_password>', password);
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ MongoDB password updated in .env file');
    
  } catch (error) {
    console.error('❌ Failed to update password:', error.message);
  }
}

// Run setup
setup(); 