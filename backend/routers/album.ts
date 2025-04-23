
import express from "express";
import {Error} from 'mongoose';
import {AlbumWithoutId, IAlbum} from "../types";
import Album from "../models/Album";
import {imagesUpload} from "../multer";

const albumRouter = express.Router();

albumRouter.get('/', async (req, res, next) => {
    try {
        const queryArtist = req.query.artist as string;
        let albums = await Album.find();
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
        if (!req.body.title || !req.body.createdDate) {
            res.status(404).send('Fill all required fields');
            return;
        }
        const newAlbum: AlbumWithoutId = {
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