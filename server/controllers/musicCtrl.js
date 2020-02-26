const axios = require('axios');
let queue = [];
let id = 0;

//QUESTION: HOW TO GET MANY SONGS FROM API INSTEAD OF HAVING A METHOD FOR EACH SONG

module.exports = {
    getSongs: (req, res) => {
        const songs = []
        axios.get(`https://deezerdevs-deezer.p.rapidapi.com/track/{id}`)
        .then(res => {
            songs.push(res.data)
            res.status(200).send(songs)
        })
        .catch(err => res.status(500).send(err))
    },
    getAlbums: (req, res) => {
        const albums = []
        axios.get(`https://deezerdevs-deezer.p.rapidapi.com/track/{id}`)
        .then(res => {
            albums.push(res.data)
            res.status(200).send(albums)
        })
        .catch(err => res.status(500).send(err))
    },
    getArtists: (req, res) => {
        const artists = []
        axios.get(`https://deezerdevs-deezer.p.rapidapi.com/track/{id}`)
        .then(res => {
            artists.push(res.data)
            res.status(200).send(artists)
        })
        .catch(err => res.status(500).send(err))
    },
    getFeatured: (req, res) => {
        const db = req.app.get('db');
        db.music.get_featured()
        .then(featured => res.status(200).send(featured))
        .catch(err => res.status(500).send(err))
    },
    getDiscover: (req, res) => {
        const db = req.app.get('db')
        db.music.get_discover()
        .then(discover => res.status(200).send(discover))
        .catch(err => res.status(500).send(err))
    },
    getTop: (req, res) => {
        const db = req.app.get('db')
        db.music.get_top_charts()
        .then(top_charts => res.status(200).send(top_charts))
        .catch(err => res.status(500).send(err))
    },
    postQueue: (req, res) => {
        const {song, artist, album} = req.body;
        const queueInput = {
            id,
            song,
            artist,
            album
        }
        queue.push(queueInput)
        id++
        res.status(200).send(queue);
    },
    getQueue: (req, res) => {
        res.status(200).send(queue);
    }
}