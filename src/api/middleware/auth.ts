import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
import { config } from '../config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // This middleware is disabled for now
  // Uncomment and install jsonwebtoken if auth is needed
  
  /*
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'No token, authorization denied' 
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token is not valid' 
    });
  }
  */
  
  // Just pass through for now
  next();
}; 