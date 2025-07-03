/*
    Event routes
    /api/events

 */
import {Router} from 'express'
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

// Obtener evento
router.get('/', validarJWT, getEventos );

//Crear nuevo evento
router.post('/', validarJWT, crearEvento );

// Actualizar evento
router.post('/:id', validarJWT, actualizarEvento );

// Eliminar evento
router.delete('/:id', validarJWT, eliminarEvento );

export {router}