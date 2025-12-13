import {
  createUserService,
  loginUserService,
  refreshAccessTokenService,
  getAllUsersService,
  deleteUserByIdService,
  findUserByIdService,
  getCurrentUserService
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
    const { accessToken, user, refreshToken } = await loginUserService(req.body);

    // ✅ STORE BOTH TOKENS IN COOKIE
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      path: "/",
    });


    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user,
    });

  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};



//------------ refresh token ----------------//
export const refreshAccessToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new Error("No refresh token");
    }

    const newAccessToken = refreshAccessTokenService(refreshToken);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict", // ✅ SAME AS LOGIN
      path: "/",
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    // ✅ CLEAR COOKIES ON FAILURE
    res.clearCookie("accessToken", { path: "/" });
    res.clearCookie("refreshToken", { path: "/" });

    return res.status(401).json({ message: "Refresh token expired" });
  }
};




// logout user
export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    path: "/",
  });

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "User Logout successful!",
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


// get current user for auto login
// export const getCurrentUserController = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const result = await getCurrentUserService(userId); // ✅ FIXED

//     res.status(200).json({
//       success: true,
//       user: result
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch user" });
//   }
// };


export const getCurrentUserController = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await getCurrentUserService(req.user.id);

    res.status(200).json({
      success: true,
      user: result
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};


