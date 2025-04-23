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

TrackSchema.pre('save', async function(next) {
    if (!this.album) return next();

    const tracks = await Track.find({album: this.album}).sort('trackCount');
    if (tracks.length === 0) {
        this.trackCount = 1;
    } else {
        this.trackCount = tracks[tracks.length - 1].trackCount + 1;
    }
    next();
});

const Track = mongoose.model<ITrack>('Track', TrackSchema);
export default Track;