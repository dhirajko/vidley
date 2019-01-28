const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi')
const router = express.Router();

const customerSchema = new mongoose.Schema({
    isGold: Boolean,
    name: String,
    phone: String
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

router.get('/', async (req, res) => {
    const customer = await Customer
        .find()
        .sort({ name: 1 });
    res.send(customer)

})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer) return res.status(404).send(' The genere with given id is not found')
    res.send(customer)

})


router.post('/', async (req, res) => {

    const { error } = customerValidator(req.body);                                                                    
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    })
    customer.save();
    res.send(customer);

})


router.put('/:id', async (req, res) => {
    //Steps for Put menthod           
    console.log(req.params.id);
    const { error } = customerValidator(req.body);                                                                               
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        },
         { new: true });                                     
    if (!customer) return res.status(404).send(' The customer with given id is not found')
    res.send(customer);                                                                                   
})

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id)                                      
    if (!customer) return res.status(404).send(' The customer with given id is not found')
    res.send(customer);
})


module.exports=router;
