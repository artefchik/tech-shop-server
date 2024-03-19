import express, {Application} from "express";
import cors, {CorsOptions} from "cors";
import dotenv from 'dotenv'
import router from './src/routes';
import path from "path";
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import errorMiddleware from "./src/middleware/error.middleware";
import multer from 'multer'
import {storage} from "./src/middleware/upload.middleware";
dotenv.config()
const app: Application = express();


const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;

const DB_URL: string = process.env.DB_URL ? process.env.DB_URL : ''

const corsOptions: CorsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static(path.resolve( 'static')));
app.use(fileUpload({}));

app.use('', router)

app.use(errorMiddleware);
const start = async () => {
    try {
        await mongoose.connect(DB_URL, {});
        console.log('Подключение установлено');
        app.listen(PORT, () => console.log(`server started on PORT=${PORT}`, path.resolve(__dirname,)));
    } catch (e) {
        console.log(e);
    }
};
start();
