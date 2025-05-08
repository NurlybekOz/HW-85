
import express from "express";
import {Error} from 'mongoose';
import Album from "../models/Album";
import {imagesUpload} from "../middleware/multer";
import User from "../models/User";

const albumRouter = express.Router();

albumRouter.get('/', async (req, res, next) => {
    try {
        const queryArtist = req.query.artist as string;
        let albums = await Album.find().sort('-createdDate');
        if (queryArtist) {
            albums = albums.filter(album => album.artist.toString() === queryArtist);
        }
        res.send(albums);
    } catch (e) {
        next(e);
    }
});
albumRouter.get('/:id', async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id);
        res.send(album);
    } catch (e) {
        next(e);
    }
});
albumRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const token = req.get('Authorization');

        if (!token) {
            res.status(401).send({error: 'No token provided'});
            return;
        }

        const user = await User.findOne({token});

        if (!user) {
            res.status(401).send({error: 'Wrong token'});
            return;
        }


        const newAlbum = {
            title: req.body.title,
            artist: req.body.artist,
            createdDate: req.body.createdDate,
            image: req.file ? 'images/' + req.file.filename : null,
        }

        const album = new Album(newAlbum);
        await album.save();
        res.send(album);
    } catch (error) {
        if (error) {
            if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
                res.status(400).send(error)
                return;
            }
            next(error);
        }
    }
});
export default albumRouter;