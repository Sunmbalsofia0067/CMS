const jwt = require('jsonwebtoken');


function authorize(req, res, next) {
    const secretKey = process.env.SECRET_KEY
    const token = req.headers.authorization;
    console.log("Token ", token)
    // Check if the token is provided
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    // Verify and decode the token
    try {
      const decoded = jwt.verify(token, secretKey);
      console.log("decoded: ", decoded)
      req.user = decoded; // Attach the decoded user information to the request object
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  }

  module.exports =  authorize;