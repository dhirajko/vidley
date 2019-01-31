const mongoose = require('mongoose');
const Joi = require('joi')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }

})


function validateGenre(genere) {                                                                //sample validation 

    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genere, schema);

}

exports.genreSchema=genreSchema;
exports.validate = validateGenre;