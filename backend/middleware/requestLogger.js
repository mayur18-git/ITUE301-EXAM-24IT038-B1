// T3: Custom middleware - logs every incoming request
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.path} [${timestamp}]`);
  next(); // Pass control to the next middleware
};

module.exports = requestLogger;
