const mongoose = require('mongoose');

const Schema = mongoose.Schema

const post = new Schema({
    title: String,
    price: Number,
    quanity: { type: Number }
})
const cart = new Schema({
    product_id: String,
    total_price: Number,

})
const user = new Schema({
    finalAmount: Number
})

exports.postSchema = mongoose.model('posts', post)
exports.cartSchema = mongoose.model('carts', cart)
exports.userSchema = mongoose.model('users', user)



