import express from "express";
import Track from "../../models/Track";
import {Error} from "mongoose";

const adminTracksRouter = express.Router();


adminTracksRouter.delete('/:id', async (req, res, next) => {

    try {
        const trackId = req.params.id;
        const track = await Track.findOne({_id: trackId})
        if (!track) {
            res.send("Track not found");
        }
        await Track.deleteOne({_id: trackId});
        res.send('Track deleted successfully')
    } catch (e) {
        next(e)
    }

})

adminTracksRouter.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({error: 'Track id must be in req params'});
            return;
        }

        const track = await Track.findById(id)

        if (!track) {
            res.status(404).send({error: 'track not found'});
            return;
        }

        if (track.isPublished === true) {
            res.status(400).send({error: 'Track is already published'});
            return
        }

        track.isPublished = !track.isPublished

        await track.save();
        res.send(track);
    } catch (error) {
        if (error instanceof Error.ValidationError  || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
})
export default adminTracksRouter;