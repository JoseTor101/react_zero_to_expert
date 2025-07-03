import { response } from "express";

const getEventos = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getEventos'
    })
};

const crearEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'crearEvento'
    })
};

const actualizarEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarEvento'
    })
};

const eliminarEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminarEvento'
    })
};

export {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}