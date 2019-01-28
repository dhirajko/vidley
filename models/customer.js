const mongoose = require('mongoose');
const Joi = require('joi')

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    phone: {
        type: String,
        required: true,
        min: 3,
        max: 50
    }
})

const Customer = mongoose.model('Customer', customerSchema);

function customerValidator(body) {
    const schema = {
        isGold: Joi.boolean(),
        name: Joi.string().required().min(3).max(50),
        phone: Joi.string().min(10).max(10)
    }

    return Joi.validate(body, schema);

}

exports.Customer=Customer;
exports.validate=customerValidator;