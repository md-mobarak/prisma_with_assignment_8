// types.d.ts

declare global {
  namespace Express {
    interface Request {
      user?: any; // Change 'any' to your actual user type
    }
  }
}
