import express from "express";
import { login,register,getAllUsers,deleteUser,getUserById,logoutUser} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allUsers", getAllUsers);
router.get("/getuserbyid/:id", getUserById)
router.delete("/delete/:id", deleteUser);
router.post("/logout", logoutUser)

export default router;
