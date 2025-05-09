import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";
import crypto from "node:crypto";



const run = async() => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
    } catch (error) {
        console.log('Collection were not present, skipping drop');
    }

    await User.create(
        {
            username: 'Doe45',
            password: '123',
            role: 'user',
            token: crypto.randomUUID(),
        },
        {
            username: 'Will23',
            password: '456',
            role: 'admin',
            token: crypto.randomUUID(),
        },

    )
    const [Carti, Eminem, TheWeeknd] = await Artist.create(
        {
            name: 'Carti',
            image: "fixtures/carti.png",
            isPublished: true
        },
        {
            name: 'Eminem',
            image: "fixtures/eminem.png",
            isPublished: true
        },
        {
            name: 'The weeknd',
            image: "fixtures/theweeknd.png",
        },
    )

    const [CartiFirstAlbum, CartiSecondAlbum, EminemFirstAlbum, EminemSecondAlbum, TheWeekndAlbum] = await Album.create(
        {
            title: 'Whole lotta red',
            artist: Carti._id,
            createdDate: 2020,
            image: "fixtures/album-1-carti.png",
            isPublished: true
        },
        {
            title: 'I AM MUSIC',
            artist: Carti._id,
            createdDate: 2025,
            image: "fixtures/album-2-carti.png",
            isPublished: true
        },
        {
            title: 'The Death of Slim Shady',
            artist: Eminem._id,
            createdDate: 2024,
            image: "fixtures/album-1-eminem.png",
            isPublished: true

        },
        {
            title: 'Revival',
            artist: Eminem._id,
            createdDate: 2017,
            image: "fixtures/album-2-eminem.jpeg",
            isPublished: true
        },
        {
            title: 'Hurry Up Tomorrow',
            artist: TheWeeknd._id,
            createdDate: 2025,
            image: "fixtures/theweekndalbum.jpeg",
        },
    )
    await Track.create(
        {
            title: 'Rockstar made',
            album: CartiFirstAlbum._id,
            duration: '3:14',
            trackCount: 1,
            isPublished: true
        },
        {
            title: 'Beno!',
            album: CartiFirstAlbum._id,
            duration: '2:34',
            trackCount: 2,
            isPublished: true
        },
        {
            title: 'Slay3r',
            album: CartiFirstAlbum._id,
            duration: '2:45',
            trackCount: 3,
            isPublished: true

        },
        {
            title: 'Go2DaMoon',
            album: CartiFirstAlbum._id,
            duration: '2:00',
            trackCount: 4,
            isPublished: true
        },
        {
            title: 'Stop Breathing',
            album: CartiFirstAlbum._id,
            duration: '3:39',
            trackCount: 5,
            isPublished: true
        },
        {
            title: 'Crime',
            album: CartiSecondAlbum._id,
            duration: '2:36',
            trackCount: 1,
            isPublished: true
        },
        {
            title: 'NUMB',
            album: CartiSecondAlbum._id,
            duration: '3:02',
            trackCount: 2,
            isPublished: true
        },
        {
            title: 'LIE TO ME ',
            album: CartiSecondAlbum._id,
            duration: '3:19',
            trackCount: 3,
            isPublished: true
        },
        {
            title: 'COBRA',
            album: CartiSecondAlbum._id,
            duration: '2:49',
            trackCount: 4,
            isPublished: true
        },
        {
            title: 'EVILJ0RDAN',
            album: CartiSecondAlbum._id,
            duration: '3:04',
            trackCount: 5,
            isPublished: true
        },
        {
            title: 'Renaissance',
            album: EminemFirstAlbum._id,
            duration: '1:38',
            trackCount: 1,
            isPublished: true
        },
        {
            title: 'Habits',
            album: EminemFirstAlbum._id,
            duration: '1:38',
            trackCount: 2,
            isPublished: true
        },
        {
            title: 'Trouble',
            album: EminemFirstAlbum._id,
            duration: '4:58',
            trackCount: 3,
            isPublished: true
        },
        {
            title: 'Brand New Dance',
            album: EminemFirstAlbum._id,
            duration: '0:41',
            trackCount: 4,
            isPublished: true
        },
        {
            title: 'Evil',
            album: EminemFirstAlbum._id,
            duration: '3:50',
            trackCount: 5,
            isPublished: true
        },
        {
            title: 'Walk on Water',
            album: EminemSecondAlbum._id,
            duration: '5:02',
            trackCount: 1,
            isPublished: true
        },
        {
            title: 'Believe',
            album: EminemSecondAlbum._id,
            duration: '5:15',
            trackCount: 2,
            isPublished: true
        },
        {
            title: 'Chloraseptic',
            album: EminemSecondAlbum._id,
            duration: '5:01',
            trackCount: 3,
            isPublished: true
        },
        {
            title: 'Untouchable',
            album: EminemSecondAlbum._id,
            duration: '6:10',
            trackCount: 4,
            isPublished: true
        },
        {
            title: 'River',
            album: EminemSecondAlbum._id,
            duration: '3:41',
            trackCount: 5,
            isPublished: true
        },
        {
            title: 'Without a Warning',
            album: TheWeekndAlbum._id,
            duration: '4:52',
            trackCount: 1,
        },
        {
            title: 'Cry for Me',
            album: TheWeekndAlbum._id,
            duration: '3:47',
            trackCount: 2,
        },
        {
            title: 'Take Me Back to LA',
            album: TheWeekndAlbum._id,
            duration: '4:27',
            trackCount: 3,
        },




    )
    await db.close()
}

run().catch(console.error);