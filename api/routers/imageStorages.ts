import {Router} from "express";
import PhotoGallery from "../models/ImageStorage";
import auth, {RequestWithUser} from "../middleware/auth";
import {imageUpload} from "../multer";
import {Types} from "mongoose";
import permit from "../middleware/permit";

const imageStorageRouter = Router();

imageStorageRouter.get('/', async (_req, res, next) => {
    try {
        const images = await PhotoGallery.find().populate(
            {
                path: 'user',
                select: '_id displayName'
            });

        return res.send(images);
    } catch (err) {
        return next(err);
    }
});

imageStorageRouter.get('/:id', async (req, res, next) => {
    try {
        let _id: Types.ObjectId;

        try {
            _id = new Types.ObjectId(req.params.id);
        } catch {
            return res.status(422).send({error: 'Неправильный идентификатор!'});
        }

        const images = await PhotoGallery.find(
            {
                user: _id
            }).populate(
                {
                    path: 'user',
                    select: '_id displayName'
                });

        if (!images) {
            return res.status(422).send({error: 'Не найдено!'});
        }

        return res.send(images);
    } catch (err) {
        return next(err);
    }
});

imageStorageRouter.post('/', auth, imageUpload.single('image'), async (req: RequestWithUser, res, next) => {
    try {
        const photo = new PhotoGallery({
            user: req.user?._id,
            title: req.body.title,
            image: req.file && req.file.filename,
        });

        await photo.save();

        return res.send(photo);
    } catch (err) {
        return next(err);
    }
});

imageStorageRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        let _id: Types.ObjectId;

        try {
            _id = new Types.ObjectId(req.params.id);
        } catch {
            return res.status(422).send({error: 'Неправильный идентификатор'});
        }

        const deleteOnePhoto = await PhotoGallery.findByIdAndDelete(_id);

        if (!deleteOnePhoto) {
            return res.status(422).send({error: 'Не найдено!'});
        }

        return res.send({message: 'Одно фото удалено!'});
    } catch (err) {
        return next(err);
    }
});

imageStorageRouter.delete('/', auth, async (req: RequestWithUser, res, next) => {
    try {
        const photoId = req.query.photo as string;

        const photo = await PhotoGallery.findById(photoId);

        if (!photo) {
            return res.status(404).send({error: 'Фото не найдено'});
        }

        if (photo.user.toString() !== req.user?._id.toString()) {
            return res.status(403).send({error: 'Доступ запрещен :('});
        }

        await PhotoGallery.findByIdAndDelete(photoId);

        return res.send({message: 'Одно фото удалено!'});

    } catch (err) {
        return next(err);
    }
});

export default imageStorageRouter;