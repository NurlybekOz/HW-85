
import express from "express";
import {Error} from 'mongoose';
import Track from "../models/Track";
import {TrackWithoutId} from "../types";


const trackRouter = express.Router();

trackRouter.get('/', async (req, res, next) => {
    try {
        const queryAlbum = req.query.album as string;
        let tracks = await Track.find().sort('trackCount');
        if (queryAlbum) {
            tracks = tracks.filter(track => track.album.toString() === queryAlbum);
        }
        res.send(tracks);
    } catch (e) {
        next(e);
    }
});
trackRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const track = await Track.findById(id)


        if (!track) {
            res.sendStatus(404)
            return;
        }
        res.send(track)
    } catch (e) {
        next(e);
    }
});
trackRouter.post('/', async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.album || !req.body.duration) {
            res.status(404).send('Fill all required fields');
            return;
        }

        const newTrack: TrackWithoutId = {
            title: req.body.title,
            album: req.body.album,
            duration: req.body.duration,
            trackCount: req.body.trackCount
        }
        const track = new Track(newTrack);
        await track.save();
        res.send(track);
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
export default trackRouter;