"use strict";
import {
    loginService,
    registerService
} from '../services/auth.service.js';
import { 
    authValidation, 
    userBodyValidation 
} from '../validations/auth.validation.js';

export async function login(req, res) {
    try {
        const { body } = req;

        const { value, error } = authValidation.validate(body);

        if(error) return res.status(400).json({
            message: "Error de validación",
            error: error.message
        });

        const accessToken = await loginService(value);

        res.cookie("jwt", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Inicio de sesión exitosa",
            token: accessToken
        });
    } catch (error) {
        res.status(500).json("Error iniciando sesión: ", error);
    }
}

export async function register(req, res) {
    try {
        const { body } = req;

        const { value, error } = userBodyValidation.validate(body);

        if(error) return res.status(400).json({
            message: "Error de validación",
            error: error.message
        });

        const userRegister = await registerService(value);

        res.status(201).json({
            message: "Usuario registrado con éxito",
            data: userRegister
        });
    } catch (error) {
        res.status(500).json("Error registrado al usuario: ", error);
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie("jwt", { 
            httpOnly: true 
        });

        res.status(200).json({
            message: "Sesión cerrada exitosamente"
        })
    } catch (error) {
        res.status(500).json("Error cerrando sesión: ", error);
    }
}