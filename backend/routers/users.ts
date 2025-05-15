import express from 'express';
import User from '../models/User';
import { Error } from 'mongoose';
import {OAuth2Client} from "google-auth-library";
import config from '../config';
import auth from "../middleware/auth";
import crypto from "node:crypto";
import {imagesUpload} from "../middleware/multer";

const usersRouter = express.Router();

const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/google', async (req, res, next) => {
    try {
        if (!req.body.credential) {
            res.status(400).send({error: 'Google login Error'})
            return;
        }
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId
        })
        const payload = ticket.getPayload();
        console.log(payload);
        if (!payload) {
            res.status(400).send({error: 'Google login Error'})
            return;
        }

        const email = payload['email'];
        const googleID = payload['sub'];
        const displayName = payload['name'];
        const image = payload['picture'];

        if (!email) {
            res.status(400).send({error: 'Email is required'})
            return;
        }

        let user = await User.findOne({googleID: googleID})
        const genPassword = crypto.randomUUID()
        const genToken = crypto.randomUUID()
        if (!user) {
            user = new User({
                username: email,
                password: genPassword,
                confirmPassword: genPassword,
                image,
                displayName,
                googleID,
                token: genToken,
            })
        }
        await user.save()

        res.cookie('token', user.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        const safeUser = {
            _id: user._id,
            username: user.username,
            role: user.role,
            displayName: user.displayName,
            token: user.token,
            image: user.image,
        }

        res.send({user: safeUser, message: 'Login with google successfully'});

    } catch (e) {
        next(e);
    }
})

usersRouter.post('/',  imagesUpload.single('image'), async (req, res, next) => {

    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            displayName: req.body.displayName,
            image: req.file ? 'images/' + req.file.filename : null,
        });
        user.generateToken();
        await user.save();

        res.send({user: user, message: 'User registered successfully.'});

    } catch (error) {

        if (error instanceof Error.ValidationError) {
            res.status(400).send(error)
            return
        }
        next(error);
    }

});
usersRouter.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        res.status(400).send({error: 'Username not found'});
        return
    }
    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        res.status(400).send({error: 'Password is wrong'});
        return
    }
    user.generateToken();
    await user.save();

    res.send({user: user, message: 'Username and password is correct'});

});

usersRouter.delete('/sessions', auth, async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        res.send({message: 'Success logout'});
        return
    }

    res.clearCookie('token');

    try {
        const user = await User.findOne({token});

        if (user) {
            user.generateToken()
            await user.save();
        }

        res.send({message: 'Success logout'});

    } catch (error) {
        next(error);
    }

});



export default usersRouter;
