import express from "express";
import Artist from "../../models/Artist";
import {Error} from "mongoose";

const adminArtistRouter = express.Router();


adminArtistRouter.delete('/:id', async (req, res, next) => {

    try {
        const artistId = req.params.id;
        const artist = await Artist.findOne({_id: artistId})
        if (!artist) {
            res.send("Artist not found");
        }
        await Artist.deleteOne(artist?._id);
        res.send('Artist deleted successfully')
    } catch (e) {
        next(e)
    }

})

adminArtistRouter.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({error: 'Artist id must be in req params'});
            return;
        }

        const artist = await Artist.findById(id)

        if (!artist) {
            res.status(404).send({error: 'artist not found'});
            return;
        }
        if (artist.isPublished === true) {
            res.status(400).send({error: 'Artist is already published'});
            return
        }
        artist.isPublished = !artist.isPublished

        await artist.save();
        res.send(artist);
    } catch (error) {
        if (error instanceof Error.ValidationError  || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
})

export default adminArtistRouter;