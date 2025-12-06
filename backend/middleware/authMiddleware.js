import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (req, res, next) => {
  // 1️⃣ Get token from cookie or Authorization header
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

  // 2️⃣ If no token, deny access
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied, No token provided",
    });
  }

  try {
    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 4️⃣ Attach user info to request
    req.user = decoded;

    // 5️⃣ Continue to next middleware or route
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
