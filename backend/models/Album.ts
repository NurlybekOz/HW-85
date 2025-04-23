import mongoose from "mongoose";
import Artist from "./Artist";
import {IAlbum} from "../types";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: "Artist",
        required: true,
        validate: {
            validator: async (value: string) => {
                const artist = await Artist.findById(value)
                return !!(artist);
            },
            message: 'Artist not found',
        }

    },
    createdDate: {
        type: Number,
        required: true,
    },
    image: String,
})

const Album = mongoose.model<IAlbum>('Album', AlbumSchema);
export default Album;