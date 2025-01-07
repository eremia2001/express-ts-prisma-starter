import { Router } from 'express';
import { createUser, getUsers } from './user.service';

export const userRouter = Router();

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await getUsers();
    return res.json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await createUser(email, password);
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});
