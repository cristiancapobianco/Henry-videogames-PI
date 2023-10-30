const { Router } = require('express');
const { default: axios } = require("axios");
const { getGenres, getGenderDb } = require('../../utils/getGenres')
const { Genre, Videogame } = require('../db')



const router = Router();

router.get('/holi', (req, res) => {
    res.send("holis")
})

// router.get('/videogames', async (req, res) => {
//     try {
//         const { name } = req.query
//         const { data } = await axios("https://api.rawg.io/api/games?key=637090cd66644b249c65ab8706245b7c")
//         if (name) {
//             const data1 = data.results
//             const filteredData = data1.filter(item => item.slug.includes(name))
//             const result = filteredData.slice(0, 15)
//             const newArrayGames = result.map(obj => ({
//                 name: obj.name,
//                 image: obj.background_image,
//                 genres: obj.genres
//             }))
//             res.json(newArrayGames)
//         } else {
//             const arrayGames = data.results
//             const newArrayGames = arrayGames.map(obj => ({
//                 name: obj.name,
//                 image: obj.background_image,
//                 genres: obj.genres
//             }))
//             res.json(newArrayGames)
//         }
//     } catch (error) {
//         res.send(error)
//     }
// })

router.get('/videogames', async (req, res) => {
    try {
        const { name } = req.query;
        const apiKey = '637090cd66644b249c65ab8706245b7c';
        const perPage = 15; // Número de elementos por página
        const totalPages = 5; // Número total de páginas

        const allGames = [];

        // Realizar 5 peticiones para obtener los juegos de las 5 páginas
        for (let page = 1; page <= totalPages; page++) {
            const { data } = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=${page}`);

            if (name) {
                const data1 = data.results;
                const filteredData = data1.filter(item => item.slug.includes(name));
                const result = filteredData.slice(0, perPage);
                allGames.push(...result);
            } else {
                const arrayGames = data.results;
                const result = arrayGames.slice(0, perPage);
                allGames.push(...result);
            }
        }
        const videoGamesResponse = await Videogame.findAll();

        const newArrayGames = allGames.map(obj => ({
            id: obj.id,
            name: obj.name,
            rating: obj.rating,
            image: obj.background_image,
            genres: obj.genres,
        }))
        newArrayGames.push(...videoGamesResponse);
        // En este punto, allGames contiene los juegos de las 5 páginas
        res.json(newArrayGames);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




// router.get('/idVideogames/:idVideogames', async (req, res) => {
//     const { idVideogames } = req.params
//     if (idVideogames) {
//         try {
//             const { data } = await axios(`https://api.rawg.io/api/games/${idVideogames}?key=637090cd66644b249c65ab8706245b7c`)
//             const { name, background_image, genres, rating, released } = data
//             res.json({ name, image: background_image, genres, rating, released })
//         } catch (error) {
//             res.send(error)
//         }
//     }
// })

router.get('/idVideogames/:idVideogames', async (req, res) => {
    const { idVideogames } = req.params;

    if (idVideogames) {
        if (idVideogames.length < 10) {
            try {
                const { data } = await axios.get(`https://api.rawg.io/api/games/${idVideogames}?key=637090cd66644b249c65ab8706245b7c`);
                const { name, background_image, genres, rating, released } = data
                res.json({ name, image: background_image, genres, rating, released })
            } catch (error) {
                res.status(404).json({ message: 'Videojuego no encontrado' });
            }
        } else if (isNaN(idVideogames)) {
            try {
                const dbVideojuego = await Videogame.findByPk(idVideogames);
                const { name, image, genres, rating, released } = dbVideojuego;
                res.json({ name, image, genres, rating, released });
                console.log(dbVideojuego);
                debugger
            } catch (error) {
                res.status(500).send(error);
            }
        }

    } else {
        res.status(400).json({ message: 'ID de videojuego no proporcionado' });
    }
});
router.get('/genres', async (req, res) => {
    try {
        const result = await Genre.findAll({ attributes: ['name'] })

        if (result.length === 0) {
            const { data } = await axios('https://api.rawg.io/api/genres?key=637090cd66644b249c65ab8706245b7c')
            const genres = getGenres(data)
            genres.forEach(gen => {
                Genre.findOrCreate({
                    where: {
                        name: gen
                    }
                })
            })
            res.json(genres)
        } else {
            const genres = getGenderDb(result)
            res.json(genres)
        }
    } catch (error) {
        res.send(error.message)
    }
})

router.post('/newvideogame', async (req, res) => {
    try {
        const newgame = req.body
        const { name, description, image, date_release, rating, genres, plataforms } = newgame

        const existinggame = await Videogame.findOne({
            where: {
                name
            }
        })
        if (existinggame) {
            res.send({ message: "el juego con ese nombre ya existe" })
        } else {
            const [game, isCreated] = await Videogame.findOrCreate({
                where: {
                    name, description, image, release_date: date_release, rating, plataforms, genres
                }
            })
            if (genres && Array.isArray(genres)) {
                const relationGenres = await Genre.findAll({
                    where: {
                        name: genres
                    }
                });
                await game.setGenres(relationGenres);
            }
            res.send({ game, isCreated })
        }

    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router;
