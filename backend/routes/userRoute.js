import express from "express";
import { login,register,getAllUsers,deleteUser,getUserById,logoutUser, getCurrentUserController, refreshAccessToken} from "../controllers/userController.js";
import {verifyToken} from '../middleware/authMiddleware.js'

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allUsers", getAllUsers);
router.get("/getuserbyid/:id", getUserById)
router.delete("/delete/:id", deleteUser);
router.post("/logout", logoutUser)
router.get("/me", verifyToken , getCurrentUserController);

router.post('/refresh', refreshAccessToken)


export default router;
