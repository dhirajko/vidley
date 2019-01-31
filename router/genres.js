
const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const { genreSchema, validate } = require('../models/genre');

const Genre = mongoose.model('Genre', genreSchema);

router.get('/', async (req, res) => {
    const genre = await Genre
        .find()
        .sort({ name: 1 });
    res.send(genre)

})

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)
    if (!genre) return res.status(404).send(' The genere with given id is not found')
    res.send(genre)

})


router.post('/', async (req, res) => {

    const { error } = validate(req.body);                                                                     // validate and save
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name })
    genre.save();
    res.send(genre);

})


router.put('/:id', async (req, res) => {
    //Steps for Put menthod           

    const { error } = validate(req.body);                                                                                    // validate the input given


    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });                                     // check the items is available or not
    if (!genre) return res.status(404).send(' The genere with given id is not found')
    res.send(genre);                                                                                    // save
})

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)                                         // check the items is available or not
    if (!genre) return res.status(404).send(' The genere with given id is not found')
    res.send(genre);
})




module.exports = router;