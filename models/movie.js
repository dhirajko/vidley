const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema, Genre, validate } = require('./genre')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },

    genre: {
        type: genreSchema,
        required: true
    },

    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },

})

function validateMovie(movie) {
    
    const Schema={
        title: Joi.string().required().trim(true).min(5).max(255),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().required().min(0).max(255),
        dailyRentalRate :Joi.number().required().min(0).max(255)
    }

return Joi.validate(movie, Schema);
}
const Movie = mongoose.model('Movie', movieSchema);

exports.validateMovie=validateMovie;
exports.Movie=Movie;