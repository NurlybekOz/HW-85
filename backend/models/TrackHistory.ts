import mongoose from "mongoose";
import User from "./User";
import Track from "./Track";

const Schema = mongoose.Schema;

const TrackHistory = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
            validator: async (value: string) => {
                const user = await User.findById(value)
                return !!(user);
            },
            message: 'User not found',
        }
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: "Track",
        required: true,
        validate: {
            validator: async (value: string) => {
                const track = await Track.findById(value)
                return !!(track);
            },
            message: 'track not found',
        }
    },
    datetime: {
        type: Date,
        required: true,
    }
})

const trackHistory = mongoose.model('TrackHistory', TrackHistory);
export default trackHistory;