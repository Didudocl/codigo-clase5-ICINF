import { Router } from "express";
import {
    getUser,
    getUsers,
} from '../controllers/user.controller.js';
import { authenticateJwt } from '../middlewares/authentication.middleware.js';
import { isAdmin } from '../middlewares/authorization.middleware.js';

const router = Router();

router
    .use(authenticateJwt) // Verifico si inicio sesión
    .use(isAdmin); // Verifico si ese usuario con sesión iniciada tiene el rol de administrador

router.get('/all', getUsers);
router.get('/:id', getUser);

export default router;