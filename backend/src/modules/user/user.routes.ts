import { Router } from 'express';
import { getAllUsers, createUser } from './user.controller';

export const userRouter = Router();

// GET /users
userRouter.get('/', getAllUsers);

// POST /users
userRouter.post('/', createUser);
