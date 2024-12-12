const logRequest = (req, res, next) => {
  console.log('Request to PATH:', req.path);
  next();
}

module.exports = logRequest