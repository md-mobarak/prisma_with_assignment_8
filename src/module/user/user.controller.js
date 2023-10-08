"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("./user.service");
const userCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, email, password, role, contactNo, address, profileImg } = req.body;
        // Hash the password before storing it
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
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
        const createdUser = yield user_service_1.userService.userCreateService(user);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User created successfully!",
            data: createdUser,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "User creation failed.",
            error: error.message,
        });
    }
});
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = yield req.body;
    try {
        // Check if the user with the provided email exists
        const user = yield user_service_1.userService.userLoginService(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Authentication failed. User not found.",
            });
        }
        // Compare the provided password with the stored hashed password
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
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
        const accessToken = jsonwebtoken_1.default.sign({
            email: email,
            role: user.role,
            userId: user.id,
            iat: oneYearAgoTimestamp,
        }, process.env.ACCESS_SECRET
        // { expiresIn: "7d" }
        );
        const refreshToken = jsonwebtoken_1.default.sign({
            email: email,
            role: user.role,
            userId: user.id,
            iat: oneYearAgoTimestamp,
        }, process.env.REFRESH_SECRET
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
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "UNAUTHORIZED USER",
            err: err,
        });
    }
});
const userGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log(req.user);
        const isAdmin = ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin";
        // console.log(isAdmin, "ata req");
        if (!isAdmin) {
            res.status(404).json({
                success: true,
                statusCode: 404,
                message: "Unauthorized access",
            });
        }
        const result = yield user_service_1.userService.allUserGetService();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User get successfully",
            data: {
                result,
            },
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to user get",
            err: err,
        });
    }
});
const userSingleGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const isAdmin = ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin";
        // console.log(isAdmin, "ata req");
        if (!isAdmin) {
            res.status(404).json({
                success: true,
                statusCode: 404,
                message: "Unauthorized access",
            });
        }
        const result = yield user_service_1.userService.singleUserGet(req.params.id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Single get successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to user get",
            err: err,
        });
    }
});
const userUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const isAdmin = ((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.role) === "admin";
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
        const result = yield user_service_1.userService.userProfileUpdate(data, id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User updated successfully",
            data: {
                result,
            },
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to user update",
            err: err,
        });
    }
});
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const isAdmin = ((_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.role) === "admin";
        // console.log(isAdmin, "ata req");
        if (!isAdmin) {
            res.status(404).json({
                success: true,
                statusCode: 404,
                message: "Unauthorized access",
            });
        }
        const id = req.params.id;
        const result = yield user_service_1.userService.userDeleteService(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User deleted successfully",
            data: {
                result,
            },
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to user delete",
            err: err,
        });
    }
});
const userProfileGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenUserId = req.user.userId;
        const tokenRole = req.user.role;
        const result = yield user_service_1.userService.userProfileGetService(tokenUserId);
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
        }
        else {
            res.status(403).json({ success: false, message: "Unauthorized access" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.userController = {
    userCreateController,
    userLoginController,
    userGetController,
    userSingleGetController,
    userUpdateController,
    deleteUserController,
    userProfileGetController,
};
