import mongoose from 'mongoose';
import express from "express";
import cors from "cors";
import artistRouter from "./routers/artist";
import albumRouter from "./routers/album";
import trackRouter from "./routers/track";
import usersRouter from "./routers/users";
import TrackHistory from "./routers/trackHistory";
import config from "./config";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use('/artists', artistRouter)
app.use('/albums', albumRouter)
app.use('/tracks', trackRouter)
app.use('/users', usersRouter)
app.use('/track_history', TrackHistory)


const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    })

    process.on('exit', () => {
        mongoose.disconnect();
    })
}
run().catch(console.error);