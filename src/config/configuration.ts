export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtRecoverySecret: process.env.JWT_RRECOVERY_PASSWORD_SECRET || 'secret',
  nodemailer_host: process.env.NODEMAILER_HOST,
  nodemailer_user: process.env.NODEMAILER_USER,
  nodemailer_password: process.env.NODEMAILER_PASSWORD,
  nodemailer_email_from: process.env.NODEMAILER_EMAIL_FROM,
});
