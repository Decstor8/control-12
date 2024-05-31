import cors from 'cors';
import mongoose from "mongoose";
import config from "./config";
import express from 'express';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());


const run = async () => {

    await  mongoose.connect(config.mongoose.db)
    app.listen(port, () => {
        console.log(`Сервер стартовал на ${port} порту`);
    });
    process.on('exit', () => {
        mongoose.disconnect();
    });
};
void run();