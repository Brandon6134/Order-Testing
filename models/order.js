const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    customer: {
        type: Number,
        required: true
    },
    sig_prod: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    order_category: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema)
//in quotation marks 'Order', it'll search for the plural of it so itll search for
//the collection of name 'orders' on mongoose, so it always looks/stores stuff there
module.exports = Order;