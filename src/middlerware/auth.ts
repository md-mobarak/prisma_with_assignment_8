import { RequestHandler } from "express";
import jwt, { Secret } from "jsonwebtoken";

const auth: RequestHandler = async (req: any, res: any, next: any) => {
  if (!req.headers) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Unauthorized user you",
    });
  }
  let verifiedToken;
  try {
    // Get authorization token
    const token = req?.headers?.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized user",
      });
    }
    // Verify the token
    verifiedToken = jwt.verify(token, process.env.ACCESS_SECRET as Secret);
    // console.log(verifiedToken);

    // Assign the user to the request object
    req.user = verifiedToken;

    next();
  } catch (err: any) {
    // next(err);
    // console.error(err);

    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: err.message,
    });
  }
};

export default auth;
