import express from "express";
import {Error} from 'mongoose';
import Artist from "../models/Artist";
import {IArtist} from "../types";
import {imagesUpload} from "../middleware/multer";

const artistRouter = express.Router();

artistRouter.get('/', async (req, res, next) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch (e) {
        next(e);
    }
});
artistRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const artist = await Artist.findById(id)


        if (!artist) {
            res.sendStatus(404)
            return;
        }
        res.send(artist)
    } catch (e) {
        next(e);
    }
});
artistRouter.post('/', imagesUpload.single('image'),async (req, res, next) => {
    try {
        if (!req.body.name) {
            res.status(404).send('Name is required');
            return;
        }

        const newArtist: IArtist = {
            name: req.body.name,
            information: req.body.information,
            image: req.file ? 'images/' + req.file.filename : null,
        }
        const artist = new Artist(newArtist);
        await artist.save();
        res.send(artist);
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
export default artistRouter;