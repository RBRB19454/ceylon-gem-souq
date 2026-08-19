const { Resend } = require('resend');

let resendClient = null;

if (process.env.RESEND_API_KEY) {
  resendClient = new Resend(process.env.RESEND_API_KEY);
} else {
  console.warn('WARNING: RESEND_API_KEY is not configured. Emails will not be sent.');
}

module.exports = resendClient;
