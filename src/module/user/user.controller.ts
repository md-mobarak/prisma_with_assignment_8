import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { Secret } from "jsonwebtoken";
import { userService } from "./user.service";

const userCreateController: RequestHandler = async (req, res) => {
  try {
    const { id, name, email, password, role, contactNo, address, profileImg } =
      req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id,
      name,
      email,
      password: hashedPassword,
      role,
      contactNo,
      address,
      profileImg,
    };

    const createdUser = await userService.userCreateService(user);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User created successfully!",
      data: createdUser,
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "User creation failed.",
      error: error.message,
    });
  }
};
const userLoginController: RequestHandler = async (req, res) => {
  const { email, password } = await req.body;
  try {
    // Check if the user with the provided email exists
    const user = await userService.userLoginService(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Authentication failed. User not found.",
      });
    }
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Authentication failed.Invalid password.",
      });
    }
    // Generate an access token
    const accessToken = jwt.sign(
      { email: email, role: user.role, userId: user.id },
      process.env.ACCESS_SECRET as Secret,
      { expiresIn: "7d" }
    );

    const refreshToken = jwt.sign(
      { email: email, role: user.role, userId: user.id },
      process.env.REFRESH_SECRET as Secret,
      { expiresIn: "7d" }
    );

    // Set the refresh token as a cookie in the response
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: {
        accessToken,
      },
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "UNAUTHORIZED USER",
      err: err,
    });
  }
};

const userGetController: RequestHandler = async (req, res) => {
  try {
    // const isAdmin = req?.user?.role;

    const result = await userService.allUserGetService();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User get successfully",
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to user get",
      err: err,
    });
  }
};

const userSingleGetController: RequestHandler = async (req, res) => {
  try {
    const result = await userService.singleUserGet(req.params.id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Single get successfully",
      data: result,
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to user get",
      err: err,
    });
  }
};
const userUpdateController: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await userService.userProfileUpdate(data, id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User updated successfully",
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to user update",
      err: err,
    });
  }
};

export const userController = {
  userCreateController,
  userLoginController,
  userGetController,
  userSingleGetController,
  userUpdateController,
};
