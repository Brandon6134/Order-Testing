
const express = require('express')
const Order = require('../models/order');
const router = express.Router()

router.get('/', (req,res) => {
    Order.find()//finds all orders in the orders collection database
        .then((result) => {
            res.render('index', {title: 'All Orders', orders: result})
        })
        .catch((err) => {
            console.log(err)
        })
})

router.post('/', (req,res) => {
    const order = new Order(req.body)
    //.body accesses all the info encoded in url (new orders created data in form),
    //with the use of the express.encodedurl middleware

    order.save()//this method saves the new const order to the database collection
        .then((results) => {
            res.redirect('/orders')
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/:id', (req,res) => {
    const id = req.params.id;
    Order.findById(id)
        .then(result => {
            res.render('details', {order: result, title: "Order Details"})
        })
        .catch((err) => {
            console.log(err)
        })
})

router.delete('/:id', (req,res) => {
    const id = req.params.id;

    Order.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect:'/orders'})
        })
        .catch(err => {
            console.log(err);
        })
})

// router.put('/:id', (req,res) => {
//     const id = req.params.id;
// })

module.exports = router;