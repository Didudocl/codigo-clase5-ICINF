"use strict";
import User from '../entity/user.entity.js';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/configDb.js';
import { encryptPassword, comparePassword } from '../utils/bcrypt.js';
import { ACCESS_TOKEN_SECRET } from '../config/configEnv.js';

export async function loginService(user) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const { email, password } = user;

        const userFound = await userRepository.findOne({
            where: {email}
        });

        if(!userFound) return "El correo electrónico es incorrecto";

        const isMatch = await comparePassword(password, userFound.password);

        if (!isMatch) return "La contraseña es incorrecta";

        const payload = {
            nombreCompleto: userFound.nombreCompleto,
            email: userFound.email,
            rut: userFound.rut,
            rol: userFound.rol
        };

        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
            expiresIn: "1d",
        });

        return accessToken;
    } catch (error) {
        console.error("Error al iniciar sesión: ", error)
    }
}

export async function registerService(user) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const { nombreCompleto, rut, email } = user;

        const existingEmailUser = await userRepository.findOne({
            where: {email}
        })

        if(existingEmailUser) return "Correo electrónico en uso";

        const existingRutUser = await userRepository.findOne({
            where: {rut}
        })

        if(existingRutUser) return "Rut ya asociado a una cuenta";

        const newUser = userRepository.create({
            nombreCompleto,
            email,
            rut,
            password: await encryptPassword(user.password),
            rol: "usuario", 
        });

        await userRepository.save(newUser);

        const { password, ...dataUser } = newUser;

        return dataUser;
    } catch (error) {
        console.error("Error al registrar un usuario: ", error);
    }
}