import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateAccessToken(user) {
  const payload = {
    id: user.id,     // ✅ FIXED
    name: user.name,
    email: user.email,
    mobile: user.mobile  
  };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '2m',
  });
}

export function generateRefreshToken(user) {
  const payload = {
    id: user.id,     // ✅ FIXED
    name: user.name,
    email: user.email,
    mobile: user.mobile
  };

  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d'
  });
}
