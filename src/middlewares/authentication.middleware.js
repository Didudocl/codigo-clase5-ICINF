"use strict";
import passport from "passport";

export function authenticateJwt(req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if(err) {
            return res.status(500).json({ message: "Error de autenticación en el servidor"});
        }

        if(!user) {
            return res.status(401).json({
                message: "No tienes permiso para acceder a este recurso",
                info: info ? info.message : "No se encontró el usuario"
            })
        }

        req.user = user;
        next();
    })(req, res, next);
}