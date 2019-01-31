const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Customer } = require("../models/customer");
const { Movie } = require('../models/movie');
const {Rental,rentalValidator} =require('../models/rental')
const fawn=require('fawn');
fawn.init(mongoose);


router.get('/', async (req, res) => {
    const rental = await Rental
        .find()
        .sort('-dateOut')
    res.send(rental);
})

router.get('/:id', async (req, res) => {
    const rental = await Rental
        .findById(req.params.id)
        .sort('-dateOut')
    res.send(rental);
})

router.post('/', async (req, res) => {
    const { error } = rentalValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Customer of this id is not found');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send(' The  movie with the given id is not found')

  

    if (movie.numberInStock === 0) return res.send(' Movie not sufficient to rent')

    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate 
        }  
    })

    try{new fawn.Task()
        .save('rentals', rental)
        .update('movies',{_id: movie._id},{
            $inc: { numberInStock: -1}
        })
        .run()
        res.send(rental);
    }catch(ex){
        res.status(500).send('something failed')
    }
    
})



module.exports=router;