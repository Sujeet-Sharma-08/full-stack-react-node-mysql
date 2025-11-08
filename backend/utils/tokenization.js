import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateAccessToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.username,
    mobile: user.mobile  
  };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '15m',
  });
}

export function generateRefreshToken(user){
  const payload= {
    id:user._id,
    name: user.name,
    email: user.email,
    mobile : user.mobile
  }
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn:'7d'
  })

}