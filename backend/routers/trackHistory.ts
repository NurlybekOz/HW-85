import express from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";

const trackHistory = express.Router();


trackHistory.post('/', async (req, res) => {
    const token = req.get('Authorization');

    if (!token) {
        res.status(401).send({error: 'No token provided'});
        return;
    }

    const user = await User.findOne({token});

    if (!user) {
        res.status(401).send({error: 'Wrong token'});
        return;
    }

    const newTrackHistory = {
        track: req.body.track,
        user: user._id,
        datetime: new Date(),
    }
    const trackHistory = new TrackHistory(newTrackHistory);
    await trackHistory.save();
    res.send(trackHistory);
})

trackHistory.get('/', async (req, res) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).send({error: 'No token provided'});
        return;
    }
    const user = await User.findOne({token});

    if (!user) {
        res.status(401).send({error: 'Wrong token'});
        return;
    }

    const tracksHistory = await TrackHistory.find({ user: user._id })
        .populate({
            path: 'track',
            populate: {
                path: 'album',
                populate: {
                    path: 'artist',
                    select: 'name'
                }
            }
        }).sort('-datetime');

    res.send(tracksHistory);

})

export default trackHistory