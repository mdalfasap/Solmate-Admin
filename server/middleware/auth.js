// auth.js
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default async function Auth(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Authentication failed. Token missing.' });
    }
    const decodedToken = Jwt.verify(token.replace('Bearer ', ''), process.env.JWTS); // Replace 'your-secret-key' with your actual secret key

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error('Authentication Error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
}

