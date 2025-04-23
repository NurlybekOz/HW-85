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
        user: user.id,
        track: req.body.track,
        datetime: new Date(),
    }
    const trackHistory = new TrackHistory(newTrackHistory);
    await trackHistory.save();
    res.send(trackHistory);
})

export default trackHistory