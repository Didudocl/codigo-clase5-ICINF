"use strict";
import Joi from "joi";

const domainEmailValidator = (value, helper) => {
    if (!value.endsWith("@gmail.cl")) {
        return helper.message(
            "El correo electrónico debe ser del dominio @gmail.cl",
        );
        }
    return value;
};

export const authValidation = Joi.object({
    email: Joi.string()
        .min(15)
        .max(30)
        .email()
        .required()
        .messages({
            "string.empty": "El correo electrónico no puede estar vacío.",
            "any.required": "El correo electrónico es obligatorio.",
            "string.base": "El correo electrónico debe ser de tipo string.",
            "string.email": "El correo electrónico debe tener un formato válido.",
            "string.min":
            "El correo electrónico debe tener como mínimo 15 caracteres.",
            "string.max":
            "El correo electrónico debe tener como máximo 30 caracteres.",
        })
        .custom(domainEmailValidator, "Validación dominio email"),
    password: Joi.string()
        .min(8)
        .max(26)
        .pattern(new RegExp("^[a-zA-Z0-9]+$"))
        .required()
        .messages({
            "string.empty": "La contraseña no puede estar vacía.",
            "any.required": "La contraseña es obligatoria.",
            "string.base": "La contraseña debe ser de tipo string.",
            "string.min": "La contraseña debe tener como mínimo 8 caracteres.",
            "string.max": "La contraseña debe tener como máximo 26 caracteres.",
            "string.pattern.base":
            "La contraseña solo puede contener letras y números.",
        }),
    }).messages({
        "object.unknown": "No se permiten propiedades adicionales.",
});

export const userBodyValidation = Joi.object({
    nombreCompleto: Joi.string()
        .min(3)
        .max(30)
        .pattern(new RegExp("^[a-zA-Z\\s]+$"))
        .required()
        .messages({
            "string.empty": "El nombre completo no puede estar vacío.",
            "any.required": "El nombre completo es obligatorio.",
            "string.base": "El nombre completo debe ser de tipo string.",
            "string.min": "El nombre completo debe tener como mínimo 3 caracteres.",
            "string.max": "El nombre completo debe tener como máximo 30 caracteres.",
            "string.pattern.base": "El nombre completo permite solo letras de la a-z",
    }),
    rut: Joi.string()
        .min(9)
        .max(12)
        .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
        .optional()
        .messages({
            "string.empty": "El Rut no puede estar vacío.",
            "any.required": "El Rut es obligatorio.",
            "string.base": "El Rut debe ser de tipo string.",
            "string.min": "El Rut debe tener como mínimo 9 caracteres.",
            "string.max": "El Rut debe tener como máximo 12 caracteres.",
            "string.pattern.base": "El rut debe ser con el formato xx.xxx.xxx-x o xxxxxxxx-x, entre 1.000.000-0 y 29.999.999-9 o 1000000-0 y 29999999-9.",
        }),
    email: Joi.string()
        .min(15)
        .max(30)
        .email()
        .required()
        .messages({
            "string.empty": "El correo electrónico no puede estar vacío.",
            "any.required": "El correo electrónico es obligatorio.",
            "string.base": "El correo electrónico debe ser de tipo string.",
            "string.email": "El correo electrónico debe tener un formato válido.",
            "string.min":
            "El correo electrónico debe tener como mínimo 15 caracteres.",
            "string.max":
            "El correo electrónico debe tener como máximo 30 caracteres.",
        })
        .custom(domainEmailValidator, "Validación dominio email"),
        password: Joi.string()
        .min(8)
        .max(26)
        .pattern(new RegExp("^[a-zA-Z0-9]+$"))
        .required()
        .messages({
            "string.empty": "La contraseña no puede estar vacía.",
            "any.required": "La contraseña es obligatoria.",
            "string.base": "La contraseña debe ser de tipo string.",
            "string.min": "La contraseña debe tener como mínimo 8 caracteres.",
            "string.max": "La contraseña debe tener como máximo 26 caracteres.",
            "string.pattern.base":
            "La contraseña solo puede contener letras y números.",
        }),
    }).messages({
        "object.unknown": "No se permiten propiedades adicionales.",
});