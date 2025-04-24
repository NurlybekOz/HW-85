import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";


const run = async() => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
    } catch (error) {
        console.log('Collection were not present, skipping drop');
    }

    const [Carti, Eminem] = await Artist.create(
        {
            name: 'Carti',
            image: "fixtures/carti.png"
        },
        {
            name: 'Eminem',
            image: "fixtures/eminem.png"
        },
    )

    const [CartiFirstAlbum, CartiSecondAlbum, EminemFirstAlbum, EminemSecondAlbum] = await Album.create(
        {
            title: 'Whole lotta red',
            artist: Carti._id,
            createdDate: 2020,
            image: "fixtures/album-1-carti.png"
        },
        {
            title: 'I AM MUSIC',
            artist: Carti._id,
            createdDate: 2025,
            image: "fixtures/album-2-carti.png"
        },
        {
            title: 'The Death of Slim Shady',
            artist: Eminem._id,
            createdDate: 2024,
            image: "fixtures/album-1-eminem.png"
        },
        {
            title: 'Revival',
            artist: Eminem._id,
            createdDate: 2017,
            image: "fixtures/album-2-eminem.jpeg"
        },
    )
    await Track.create(
        {
            title: 'Rockstar made',
            album: CartiFirstAlbum._id,
            duration: '3:14',
            trackCount: 1,
        },
        {
            title: 'Beno!',
            album: CartiFirstAlbum._id,
            duration: '2:34',
            trackCount: 2,
        },
        {
            title: 'Slay3r',
            album: CartiFirstAlbum._id,
            duration: '2:45',
            trackCount: 3,
        },
        {
            title: 'Go2DaMoon',
            album: CartiFirstAlbum._id,
            duration: '2:00',
            trackCount: 4,
        },
        {
            title: 'Stop Breathing',
            album: CartiFirstAlbum._id,
            duration: '3:39',
            trackCount: 5,
        },
        {
            title: 'Crime',
            album: CartiSecondAlbum._id,
            duration: '2:36',
            trackCount: 1,
        },
        {
            title: 'NUMB',
            album: CartiSecondAlbum._id,
            duration: '3:02',
            trackCount: 2,
        },
        {
            title: 'LIE TO ME ',
            album: CartiSecondAlbum._id,
            duration: '3:19',
            trackCount: 3,
        },
        {
            title: 'COBRA',
            album: CartiSecondAlbum._id,
            duration: '2:49',
            trackCount: 4,
        },
        {
            title: 'EVILJ0RDAN',
            album: CartiSecondAlbum._id,
            duration: '3:04',
            trackCount: 5,
        },
        {
            title: 'Renaissance',
            album: EminemFirstAlbum._id,
            duration: '1:38',
            trackCount: 1,
        },
        {
            title: 'Habits',
            album: EminemFirstAlbum._id,
            duration: '1:38',
            trackCount: 2,
        },
        {
            title: 'Trouble',
            album: EminemFirstAlbum._id,
            duration: '4:58',
            trackCount: 3,
        },
        {
            title: 'Brand New Dance',
            album: EminemFirstAlbum._id,
            duration: '0:41',
            trackCount: 4,
        },
        {
            title: 'Evil',
            album: EminemFirstAlbum._id,
            duration: '3:50',
            trackCount: 5,
        },
        {
            title: 'Walk on Water',
            album: EminemSecondAlbum._id,
            duration: '5:02',
            trackCount: 1,
        },
        {
            title: 'Believe',
            album: EminemSecondAlbum._id,
            duration: '5:15',
            trackCount: 2,
        },
        {
            title: 'Chloraseptic',
            album: EminemSecondAlbum._id,
            duration: '5:01',
            trackCount: 3,
        },
        {
            title: 'Untouchable',
            album: EminemSecondAlbum._id,
            duration: '6:10',
            trackCount: 4,
        },
        {
            title: 'River',
            album: EminemSecondAlbum._id,
            duration: '3:41',
            trackCount: 5,
        },



    )
    await db.close()
}

run().catch(console.error);