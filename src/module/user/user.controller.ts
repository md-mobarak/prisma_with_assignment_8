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

    // Calculate a timestamp that is 1 year ago from the current time
    const oneYearAgoTimestamp = Math.floor(Date.now() / 1000) - 31536001; // 1 year + 1 second = 31536001 seconds
    // Generate an access token
    const accessToken = jwt.sign(
      {
        email: email,
        role: user.role,
        userId: user.id,
        iat: oneYearAgoTimestamp,
      },
      process.env.ACCESS_SECRET as Secret
      // { expiresIn: "7d" }
    );

    const refreshToken = jwt.sign(
      {
        email: email,
        role: user.role,
        userId: user.id,
        iat: oneYearAgoTimestamp,
      },
      process.env.REFRESH_SECRET as Secret
      // { expiresIn: "7d" }
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

const userGetController: RequestHandler = async (req: any, res: any) => {
  try {
    console.log(req.user);

    const isAdmin = req?.user?.role === "admin";
    // console.log(isAdmin, "ata req");
    if (!isAdmin) {
      res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized access",
      });
    }

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

const userSingleGetController: RequestHandler = async (req: any, res) => {
  try {
    const isAdmin = req?.user?.role === "admin";
    // console.log(isAdmin, "ata req");
    if (!isAdmin) {
      res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized access",
      });
    }
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
const userUpdateController: RequestHandler = async (req: any, res) => {
  try {
    const isAdmin = req?.user?.role === "admin";
    // console.log(isAdmin, "ata req");
    if (!isAdmin) {
      res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized access",
      });
    }
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
const deleteUserController: RequestHandler = async (req: any, res) => {
  try {
    const isAdmin = req?.user?.role === "admin";
    // console.log(isAdmin, "ata req");
    if (!isAdmin) {
      res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized access",
      });
    }
    const id = req.params.id;
    const result = await userService.userDeleteService(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User deleted successfully",
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to user delete",
      err: err,
    });
  }
};
const userProfileGetController: RequestHandler = async (req: any, res) => {
  try {
    const tokenUserId = req.user.userId;
    const tokenRole = req.user.role;
    const result = await userService.userProfileGetService(tokenUserId);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Check if the user is either an admin or a customer
    if (tokenRole === "admin" || tokenRole === "customer") {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Profile retrieved successfully",
        data: result,
      });
    } else {
      res.status(403).json({ success: false, message: "Unauthorized access" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const userController = {
  userCreateController,
  userLoginController,
  userGetController,
  userSingleGetController,
  userUpdateController,
  deleteUserController,
  userProfileGetController,
};
