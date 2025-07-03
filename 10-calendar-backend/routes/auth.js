/*
    Rutas de Usuarios /Auth
    host + /api/auth
*/

import { Router } from 'express'
import { check } from 'express-validator';
import { crearUsuario, loginUsuario, revalidarToken } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
const router = Router();


// Argentos: (ruta, middlewares, controlador)

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario)

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario)

router.get('/renew', validarJWT, revalidarToken)

export default router;