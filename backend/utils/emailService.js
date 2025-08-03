const nodemailer = require('nodemailer');


const createTransporter = () => {
  
  if (process.env.NODE_ENV === 'production') {
    // Production email service (SendGrid, Mailgun, etc.)
    return nodemailer.createTransporter({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else {
    // Development - use Ethereal for testing
    return nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ETHEREAL_USER || 'test@example.com',
        pass: process.env.ETHEREAL_PASS || 'testpass'
      }
    });
  }
};

// Send welcome email to new subscribers
const sendWelcomeEmail = async (email, name = '') => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"NeuroBit by SanchitVerse" <${process.env.EMAIL_USER || 'hello@neurobit.com'}>`,
      to: email,
      subject: 'Welcome to NeuroBit! 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0ea5e9, #d946ef); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to NeuroBit!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">AI-Enhanced Productivity Tools</p>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <h2 style="color: #1e293b; margin-bottom: 20px;">Hi ${name || 'there'}! 👋</h2>
            
            <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
              Thank you for joining the NeuroBit community! You're now part of a growing group of 
              students, creators, and professionals who are supercharging their productivity with AI.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
              <h3 style="color: #1e293b; margin: 0 0 10px 0;">What's Next?</h3>
              <ul style="color: #475569; margin: 0; padding-left: 20px;">
                <li>Get early access to new AI tools and templates</li>
                <li>Receive weekly productivity tips and AI hacks</li>
                <li>Join exclusive member-only discounts</li>
                <li>Connect with fellow productivity enthusiasts</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/templates" 
                 style="background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Explore Our Templates
              </a>
            </div>
            
            <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
              Best regards,<br>
              <strong>SanchitVerse</strong><br>
              Founder, NeuroBit
            </p>
          </div>
          
          <div style="background: #1e293b; color: #94a3b8; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">
              © 2024 NeuroBit by SanchitVerse. All rights reserved.
            </p>
            <p style="margin: 10px 0 0 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/unsubscribe" 
                 style="color: #94a3b8;">Unsubscribe</a>
            </p>
          </div>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Welcome email sent:', info.messageId);
      console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    return info;
    
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Send notification email to admin
const sendAdminNotification = async (subject, message, data = {}) => {
  try {
    if (!process.env.ADMIN_EMAIL) {
      console.log('No admin email configured, skipping notification');
      return;
    }
    
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"NeuroBit System" <${process.env.EMAIL_USER || 'system@neurobit.com'}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `NeuroBit Notification: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1e293b; padding: 20px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px;">NeuroBit Notification</h1>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <h2 style="color: #1e293b; margin-bottom: 20px;">${subject}</h2>
            
            <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
              ${message}
            </p>
            
            ${Object.keys(data).length > 0 ? `
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e293b; margin: 0 0 10px 0;">Details:</h3>
                <pre style="background: #f1f5f9; padding: 10px; border-radius: 4px; overflow-x: auto; font-size: 12px;">
${JSON.stringify(data, null, 2)}
                </pre>
              </div>
            ` : ''}
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin" 
                 style="background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                View Dashboard
              </a>
            </div>
          </div>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Admin notification sent:', info.messageId);
    }
    
    return info;
    
  } catch (error) {
    console.error('Admin notification failed:', error);
    throw error;
  }
};

// Send feedback notification
const sendFeedbackNotification = async (feedback) => {
  const subject = 'New Feedback Received';
  const message = `A new feedback has been submitted for review.`;
  
  return sendAdminNotification(subject, message, feedback);
};

// Send new subscriber notification
const sendNewSubscriberNotification = async (subscriber) => {
  const subject = 'New Subscriber';
  const message = `A new person has subscribed to the NeuroBit newsletter.`;
  
  return sendAdminNotification(subject, message, subscriber);
};

module.exports = {
  sendWelcomeEmail,
  sendAdminNotification,
  sendFeedbackNotification,
  sendNewSubscriberNotification
}; 