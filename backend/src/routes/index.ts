import { Router } from 'express';
import { userRouter } from '../modules/user/user.routes';

export const router = Router();

// Alle User-Routen unter dem Pfad `/api/users` verfügbar machen
router.use('/users', userRouter);

// Beispiel für andere Module (z.B. "products", "rentals" etc.):
// router.use('/products', productRouter);
