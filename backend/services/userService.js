import connection from "../config/db.js";
import { queries } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenization.js";
import jwt from 'jsonwebtoken';

// Register user
export const createUserService = async ({ name, email, mobile, password }) => {

  if (!name || !email || !mobile || !password) {
    throw new Error("All fields are required!");
  }
  const [rows] = await connection.execute(queries.findByEmail, [email]);
  if (rows.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await connection.execute(queries.createUser, [
    name,
    email,
    mobile,
    hashedPassword,
  ]);

  return { id: result.insertId, name, email, mobile };
};


// Login user
export const loginUserService = async ({ email, password }) => {

  if (!email || !password) {
    throw new Error("All fields are required!");
  }

  // console.log("email, password", email, password)

  const [rows] = await connection.execute(queries.findByEmail, [email]);
  if (rows.length === 0) throw new Error("User not found");

  const user = rows[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid Email or Password!");

  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user);

  

  return { accessToken, user, refreshToken };
};

// refresh token generation service
export const refreshAccessTokenService = (refreshToken) => {

  if (!refreshToken) {
    throw new Error("No refresh token provided");
  }

  try {
    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = generateAccessToken(user);

    return newAccessToken;

  } catch (err) {
    throw new Error("Invalid or expired refresh token");
  }
}


// Get all users
export const getAllUsersService = async () => {
  const [users] = await connection.execute(queries.findAllUsers);
  return users;
};


// find by id
export const findUserByIdService = async ({ id }) => {
  const [rows] = await connection.execute(queries.findById, [id]);
  if (rows.length === 0) {
    throw new Error(`User not found with this id : ${id}`);
  }
  return rows[0];
}

// Delete user by ID
export const deleteUserByIdService = async (id) => {

  const [existingUser] = await connection.execute(queries.findById, [id]);

  if (existingUser.length === 0) {
    throw new Error(`User not found with this id: ${id}`);
  }

  await connection.execute(queries.deleteUserById, [id]);
  return true;
};


export const getCurrentUserService = async (id) => {

  const [rows] = await connection.execute(queries.findById, [id]);
  if (rows.length === 0) {
    throw new Error(`User not found with this id : ${id}`);
  }
  return rows[0];

}