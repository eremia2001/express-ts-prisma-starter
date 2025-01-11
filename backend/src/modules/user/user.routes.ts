import { Router } from 'express';
import { getAllUsers, createUser, getUserById } from './user.controller';

export const userRouter = Router();

// GET /users
userRouter.get('/', getAllUsers);

// POST /users
userRouter.post('/', createUser);

// GET /users/:id
userRouter.get('/:id', getUserById);
