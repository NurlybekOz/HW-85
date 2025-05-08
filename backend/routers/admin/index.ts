import express from "express";
import permit from "../../middleware/permit";
import auth from "../../middleware/auth";
import adminAlbumRouter from "./albums";
import adminArtistRouter from "./artists";
import adminTracksRouter from "./tracks";

const adminRouter = express.Router();

adminRouter.use(auth, permit('admin'));
adminRouter.use('/albums', adminAlbumRouter)
adminRouter.use('/artists', adminArtistRouter)
adminRouter.use('/tracks', adminTracksRouter)




export default adminRouter;