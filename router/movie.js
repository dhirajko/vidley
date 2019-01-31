const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { validateMovie, movieSchema } = require('../models/movie');
const { genreSchema} = require('../models/genre');


const Movie = mongoose.model('Movie', movieSchema);
const Genre = mongoose.model('Genre', genreSchema);

router.get('/', async(req, res) => {

 
    const movies =await Movie
        .find()
        .sort({ title: 1 })

    res.send(movies);
 })

router.get('/:id', async (req, res) => {
    const movie = await Movie
        .findById(req.params.id)

    res.send(movie);
})

router.post('/', async (req, res) => {
    console.log(req.body);
    
     const {error} = validateMovie(req.body)
    if (error) return res.status(400).send(error.details[0].message);
       
    

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid Genre");

    let movie = new Movie({
        title: req.body.title,    

        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    const result =await movie.save();
    res.send(result);
})

router.put('/:id', async (req, res) => {
    const { errror } = validateMovie(req.body)
    if (errror) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!errror) return res.status(400).send("Invalid Genre");

    res.send(req.body)

    const movie= Movie.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        genreId: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {new: true})

    if (!movie) return res.status(404).send(' The genere with given id is not found')
    res.send(movie);

})

router.delete('/:id',async (req,res)=>{
    const movie= await Movie.findByIdAndDelete(req.params.id);
    if(!movie) return res.status(400).send('The movie with given id  not found')
    res.send(movie);
})
module.exports=router;
