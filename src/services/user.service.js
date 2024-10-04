"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';
import { formatToLocalTime } from '../utils/formatDate.js'

export async function getUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({
            where: { id }
        });

        if (!userFound) {
            return null;
        }

        userFound.createdAt = formatToLocalTime(userFound.createdAt);
        userFound.updatedAt = formatToLocalTime(userFound.updatedAt);

        return userFound;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
    }
}