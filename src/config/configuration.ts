export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  asdasd: {
    asdasda: process.env.asdasd || 'asdasd',
  },
});
