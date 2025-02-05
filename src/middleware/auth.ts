import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token; // Ensure cookies exist

  if (!token) {
    res.status(401).json({ message: "Access denied" });
    return;
  }

  try {

    const decoded = verifyToken(token);
    req.userId = decoded.userId; 
    next();
    
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
