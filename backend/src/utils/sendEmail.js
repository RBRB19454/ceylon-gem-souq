const resend = require('../config/email');
const User = require('../models/User');

const FROM_EMAIL = 'onboarding@resend.dev';

// Notify all administrators when a new user registers
const notifyAdminsNewRegistration = async (newUser) => {
  if (!resend) {
    console.warn('Email service not initialized. Admin notification skipped.');
    return;
  }

  try {
    const admins = await User.find({ role: 'admin' });
    if (admins.length === 0) {
      console.log('No admins found to notify.');
      return;
    }

    const recipientEmails = admins.map((admin) => admin.email);

    for (const email of recipientEmails) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `New User Registration: ${newUser.name} (${newUser.role})`,
        html: `
          <h3>New User Pending Verification</h3>
          <p>A new user has registered on Ceylon Gem Souq and is awaiting verification.</p>
          <ul>
            <li><strong>Name:</strong> ${newUser.name}</li>
            <li><strong>Email:</strong> ${newUser.email}</li>
            <li><strong>Role:</strong> ${newUser.role}</li>
            <li><strong>Phone:</strong> ${newUser.phone || 'Not provided'}</li>
          </ul>
          <p>Please log in to the <a href="http://localhost:5173/admin">Admin Dashboard</a> to review and verify this user.</p>
        `,
      });
    }
    console.log(`Admin registration notifications dispatched to: ${recipientEmails.join(', ')}`);
  } catch (error) {
    console.error('Failed to send admin notification email:', error.message);
  }
};

// Send an email to the user once they are approved by an admin
const sendVerificationApprovedEmail = async (user) => {
  if (!resend) {
    console.warn('Email service not initialized. Verification email skipped.');
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: 'Account Approved - Ceylon Gem Souq',
      html: `
        <h3>Congratulations ${user.name}!</h3>
        <p>Your account has been reviewed and verified by the Ceylon Gem Souq administrator.</p>
        <p>You can now log in and take full advantage of our platform:</p>
        <ul>
          ${
            user.role === 'owner'
              ? '<li>Submit your gemstone listings to the collection with lab certificate details and dynamic pricing.</li>'
              : '<li>Send direct booking and inquiry requests to verified gemstone owners on our marketplace.</li>'
          }
          <li>Access your personalized account dashboard.</li>
        </ul>
        <p>Log in to get started: <a href="http://localhost:5173/login">Ceylon Gem Souq Portal</a></p>
        <p>Best regards,<br/>The Ceylon Gem Souq Team</p>
      `,
    });
    console.log(`Verification approval email sent successfully to ${user.email}`);
  } catch (error) {
    console.error('Failed to send verification approval email:', error.message);
  }
};

// Send a password reset email to the user
const sendPasswordResetEmail = async (user, resetUrl) => {
  if (!resend) {
    console.warn('RESEND_API_KEY not set — skipping password reset email.');
    return;
  }
  await resend.emails.send({
    from: FROM_EMAIL,
    to: user.email,
    subject: 'Reset your Ceylon Gem Souq password',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #0B1E3D;">Password Reset Request</h2>
        <p>Hi ${user.name},</p>
        <p>We received a request to reset your Ceylon Gem Souq password. Click the button below to choose a new one — this link expires in 1 hour.</p>
        <p style="text-align: center; margin: 2rem 0;">
          <a href="${resetUrl}" style="background: #D4AF37; color: #0B1E3D; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 600;">Reset Password</a>
        </p>
        <p style="font-size: 0.85rem; color: #666;">If you didn't request this, you can safely ignore this email — your password will stay unchanged.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 2rem 0;">
        <p dir="rtl" style="text-align: right; font-size: 0.9rem;">
          تلقينا طلباً لإعادة تعيين كلمة مرور حسابك في سوق أحجار سيلان الكريمة. إذا لم تطلب هذا، يمكنك تجاهل هذه الرسالة بأمان.
        </p>
      </div>
    `,
  });
};

module.exports = {
  notifyAdminsNewRegistration,
  sendVerificationApprovedEmail,
  sendPasswordResetEmail,
};
