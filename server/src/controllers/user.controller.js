import bcrypt from "bcrypt"; // Ensure bcrypt is installed
import user from "../model/User.model.js";
import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";

// Register User
export const registerUser = asynchandler(async (req, res) => {
  try {
    const { fullName, email, username, password, age } = req.body;
    console.log(fullName, email, username, password, age);
    // Check for empty fields
    if (
      [fullName, email, username, password].some(
        (field) => typeof field === "string" && field.trim() === ""
      ) ||
      age === undefined ||
      age === null
    ) {
      throw new ApiError(401, "All fields are required");
    }

    // Check if the user already exists
    const existedUser = await user.findOne({
      $or: [{ email }, { username }],
    });
    if (existedUser) {
      throw new ApiError(401, "Username or Email already exists");
    }
    // Create new user
    const User = await user.create({
      fullName,
      password,
      username,
      email,
      age,
    });

    // Find the created user and exclude password from the result
    const createdUser = await user.findById(User._id).select("-password");

    // Check if the user was successfully created
    if (!createdUser) {
      throw new ApiError(
        402,
        "Something went wrong while creating the account"
      );
    }

    // Send response
    return res.status(201).json(createdUser);
  } catch (error) {
    console.error("Server Error", error);
    throw new ApiError(402, "Internal Server Error");
  }
});

export const loginUser = asynchandler(async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Ensure that either username or email is provided
    if (!(username || email)) {
      throw new ApiError(401, "Username or Email is required");
    }

    // Find user by username or email
    const userDetail = await user.findOne({
      $or: [{ username }, { email }],
    });

    if (!userDetail) {
      throw new ApiError(402, "Invalid Credentials");
    }

    // Compare plain text password with the stored hashed password
    const passwordCompare = await bcrypt.compare(password, userDetail.password); // compare plain text password

    if (!passwordCompare) {
      throw new ApiError(402, "Please try to login with correct credentials");
    }

    // Generate access token
    const accessToken = userDetail.generateAccessToken();

    // Exclude password from user details
    const loggedUser = await user.findById(userDetail._id).select("-password");
    console.log("Success")
    // Send token and user details in response
    return res
      .status(200)
      .cookie("accessToken", accessToken, { httpOnly: true }) // Ensure it's httpOnly for security
      .json({ userDetail: loggedUser, accessToken });
  } catch (error) {
    console.error("Server Error", error);
    throw new ApiError(500, "Internal Server Error");
  }
});

// Logout User
export const logoutUser = asynchandler(async (req, res) => {
  try {
    const userId = req.user._id;
    await user.findByIdAndUpdate(userId);

    // Clear the cookie
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .json("User Logged Out Successfully");
  } catch (error) {
    console.error("Internal Server Error", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
