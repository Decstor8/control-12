import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";
import config from "./config";
import usersRouter from "./routers/users";
import photoGalleryRouter from "./routers/imageStorages";

const app = express();
const port = 8000;
// Регистрация и логин
// Теперь есть возможность зарегистрироваться и залогиниться а так же добавлен новый роут imageStorage "хранилище изображений" можно получить массив обьектов по id можно получить данные определенного пользователя
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/users', usersRouter);
app.use('/photos', photoGalleryRouter);

const run = async () => {
    await  mongoose.connect(config.mongoose.db)

    app.listen(port, () => {
        console.log(`server started on ${port} port`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

void run();