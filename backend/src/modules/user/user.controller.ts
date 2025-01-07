import { RequestHandler } from 'express';

import userService from './user.service';
/**
 * GET /users
 * Gibt alle Users in JSON-Form zurück.
 */
export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /users
 * Legt einen neuen User an und gibt diesen zurück.
 */
export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await userService.registerUser(email, password);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};
