import express, {Application} from "express";
import cors, {CorsOptions} from "cors";
import dotenv from 'dotenv'
import router from './src/routes';
import path from "path";
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';

dotenv.config()
const app: Application = express();


const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const corsOptions: CorsOptions = {
    origin: "http://localhost:8000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('', router)
// app
//   .listen(PORT, "localhost", function () {
//     console.log(`Server is running on port ${PORT}.`);
//   })
//   .on("error", (err: any) => {
//     if (err.code === "EADDRINUSE") {
//       console.log("Error: address already in use");
//     } else {
//       console.log(err);
//     }
//   });

const start = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/shopdb', {});
        console.log('Подключение установлено');
        app.listen(PORT, () => console.log(`server started on PORT=${PORT}`));
    } catch (e) {
        console.log(e);
    }
};
start();
