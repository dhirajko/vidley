const express = require('express');
const Joi = require('joi')
const router = express.Router();
const {Customer, validate}=require("../models/customer");

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

    const { error } = validate(req.body);
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
    const { error } = validate(req.body);
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

module.exports = router;
