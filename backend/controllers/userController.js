import {
  createUserService,
  loginUserService,
  refreshAccessTokenService,
  getAllUsersService,
  deleteUserByIdService,
  findUserByIdService
} from "../services/userService.js";


// Register user
export const register = async (req, res) => {
  try {
    const response = await createUserService(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: response,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    console.log(req.body)
    const { accessToken, user, refreshToken } = await loginUserService(req.body);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // set false in dev if no HTTPS
      sameSite: "Strict",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user,
      accessToken,
    });

  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};


// refresh token 
export const refreshAccessToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const newToken = refreshAccessTokenService(refreshToken);

    res.json({ accessToken: newToken });

  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};


// logout user
export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  return res.status(200).json({
    success: true,
    message: "user Logout successful!",
  });
};


// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({
      success: true,
      message: users.length
        ? "Users retrieved successfully!"
        : "No users found!",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// find the user by id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await findUserByIdService(id);
    if (existingUser) {
      return res.status(200).json({
        message: "user retrieved!",
        data: existingUser
      })
    }

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUserByIdService(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
