import mongoose from "mongoose";
import Album from "./Album";
import {ITrack} from "../types";

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: "Album",
        required: true,
        validate: {
            validator: async (value: string) => {
                const album = await Album.findById(value)
                return !!(album);
            },
            message: 'Album not found',
        }
    },
    duration: String,
    trackCount: {
        type: Number,
        required: true,
    }
})


const Track = mongoose.model<ITrack>('Track', TrackSchema);
export default Track;