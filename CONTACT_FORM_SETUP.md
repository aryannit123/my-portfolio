# Contact Form Setup Guide

Your contact form is now configured to receive real messages! Follow these steps to complete the setup:

## Setup Instructions

### Step 1: Create a Formspree Account
1. Go to [https://formspree.io/](https://formspree.io/)
2. Click "Get Started" or "Sign Up"
3. Create a free account using your email or GitHub

### Step 2: Create a New Form
1. After logging in, click "New Form" or "+ New Project"
2. Give your form a name (e.g., "Portfolio Contact Form")
3. Formspree will generate a unique form endpoint that looks like:
   ```
   https://formspree.io/f/YOUR_FORM_ID
   ```

### Step 3: Configure Your Form
1. Copy your form ID (it will look like `xvlabcde` or similar)
2. Open `portfolio.html` in a text editor
3. Find line 509 where it says:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Replace `YOUR_FORM_ID` with your actual form ID, for example:
   ```html
   <form id="contactForm" action="https://formspree.io/f/xvlabcde" method="POST">
   ```
5. Save the file

### Step 4: Set Email Destination
In your Formspree dashboard:
1. Go to your form settings
2. Add your email address where you want to receive messages
3. You can use: `2023ugcm002@nitjsr.ac.in`
4. Save the settings

### Step 5: Test Your Form
1. Open your portfolio website
2. Scroll to the contact section
3. Fill out the form with test data
4. Click "Send Message"
5. For the first submission, Formspree will ask you to confirm your email
6. Check your email and click the confirmation link
7. After confirmation, all future submissions will be sent directly to your email!

## Features

✅ **Real-time notifications** - Users see success/error messages
✅ **Form validation** - Checks all fields before sending
✅ **Email notifications** - You receive all messages in your email
✅ **Spam protection** - Formspree includes built-in spam filtering
✅ **Free tier** - 50 submissions per month on the free plan

## What Happens When Someone Submits?

1. User fills out the contact form
2. Form validates the data (name, email, subject, message)
3. Data is sent securely to Formspree
4. You receive an email with:
   - Sender's name
   - Sender's email
   - Subject
   - Message content
5. User sees a success notification
6. You can reply directly to the sender's email

## Upgrading (Optional)

If you need more than 50 submissions per month, Formspree offers paid plans starting at $10/month with:
- Unlimited submissions
- Custom redirects
- File uploads
- Advanced spam protection

## Alternative: Using EmailJS

If you prefer a different service, you can also use EmailJS:
1. Sign up at [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create an email service
3. Update the JavaScript to use EmailJS SDK instead

Let me know if you need help with that!

## Troubleshooting

**Issue**: Form doesn't send
- Check that you replaced `YOUR_FORM_ID` with your actual form ID
- Make sure you confirmed your email in Formspree

**Issue**: Not receiving emails
- Check your spam folder
- Verify your email is correctly set in Formspree dashboard
- Make sure you clicked the confirmation link from Formspree

**Issue**: Getting errors
- Check browser console for error messages
- Ensure you have internet connection
- Verify the Formspree form ID is correct

---

**Current Status**: ⚠️ Waiting for Formspree setup - Replace `YOUR_FORM_ID` in portfolio.html

**Your Email**: 2023ugcm002@nitjsr.ac.in
