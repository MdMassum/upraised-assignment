import { Request, Response } from 'express';
import * as authService from '../services/authService';


// user signup
export const signup = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const user = await authService.signup(email, password);
  res.status(201).json({ user });

};

// user login
export const login = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const { user, token } = await authService.login(email, password);

  // Set token in a cookie
  res.cookie('token', token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', 
    maxAge: 3600000, // 1 hour expiration
  });

  res.json({ user, token });
};

// user logout
export const logout = async (req: Request, res: Response) => {

  const userId = req.userId; 
  const result = await authService.logout(userId);
  
    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  
    res.json(result);
};