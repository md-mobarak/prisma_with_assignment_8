import { RequestHandler } from "express";
import jwt, { Secret } from "jsonwebtoken";

// Define a custom interface that extends Request
// interface CustomRequest extends Request {
//   user?: any; // Define the user property as optional
// }

const auth: RequestHandler = async (req: any, res: any, next: any) => {
  // console.log(req?.headers);

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
    // console.log(verifiedToken);

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
