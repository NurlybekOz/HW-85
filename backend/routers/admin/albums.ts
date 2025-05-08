import express from "express";
import Album from "../../models/Album";
import {Error} from "mongoose";

const adminAlbumRouter = express.Router();


adminAlbumRouter.delete('/:id', async (req, res, next) => {

    try {
        const albumId = req.params.id;
        const album = await Album.findOne({_id: albumId})
        if (!album) {
            res.send("Album not found");
        }
        await Album.deleteOne(album?._id);
        res.send('Album deleted successfully')
    } catch (e) {
        next(e)
    }

})


adminAlbumRouter.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({error: 'Album id must be in req params'});
            return;
        }

        const album = await Album.findById(id)

        if (!album) {
            res.status(404).send({error: 'album not found'});
            return;
        }
        if (album.isPublished === true) {
            res.status(400).send({error: 'Album is already published'});
            return
        }
        album.isPublished = !album.isPublished

        await album.save();
        res.send(album);
    } catch (error) {
        if (error instanceof Error.ValidationError  || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
})

export default adminAlbumRouter;