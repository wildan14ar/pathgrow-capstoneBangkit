const middlewareLogRequest = (req, res, next) => {
  console.log(`[${new Date().toString()}] Request: ${req.method}, Path: ${req.url}`);
  next();
};

module.exports = middlewareLogRequest;
