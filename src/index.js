import express, { json } from 'express'; // Module
import indexRoutes from './routes/index.routes.js';
import { PORT, HOST, cookieKey } from './config/configEnv.js';
import { connectDB } from './config/configDb.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import { passportJwtSetup } from './auth/passport-setup.js';

async function setupServer() {
    try {
        const app = express();
        
        app.use(json());

        app.use(cookieParser());

        app.use(morgan("dev"));

        app.use(
            session({
                secret: cookieKey,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: false,
                    httpOnly: true,
                    sameSite: "strict",
                },
            })
        );

        app.use(passport.initialize());
        app.use(passport.session());

        passportJwtSetup();

        app.use('/api', indexRoutes);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en: http://${HOST}:${PORT}/api`);
        });
    } catch (error) {
        console.error("Error en index.js -> setupServer(), el error es: ", error);
    }
}

async function setupAPI() {
    try {
        await connectDB();
        await setupServer();
    } catch (error) {
        console.log("Error en index.js -> setupApi(), el error es: ", error);
    }
}

setupAPI()
    .then(() => console.log("=> API iniciada exitosamente"))
    .catch((error) => {
        console.log("Error en index.js -> setupAPI(), el error es:", error);
    });