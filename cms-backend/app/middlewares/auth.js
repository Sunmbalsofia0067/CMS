const jwt = require('jsonwebtoken');


function authorize(req, res, next) {
    const secretKey = process.env.SECRET_KEY
    const token = req.headers?.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    // Verify and decode the token
    try {
      const decoded = jwt.verify(token, secretKey);
      req.userId = decoded.userId; // Attach the decoded user information to the request object
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: 'Invalid token' });
    }
  }

  module.exports =  authorize;