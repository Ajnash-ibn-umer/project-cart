const mongoose = require('mongoose');
const { postSchema, cartSchema, userSchema } = require('../database/Schema')
let finalAmount = 0
module.exports = {

    // get product datas from database ( already have product database in database)
    fetchProducts: () => {
        return new Promise(async (resolve, reject) => {


            postSchema.find({}).lean().exec(function (error, records) {
                let products = []
                records.forEach(function (record) {
                    console.log(record);

                    products.push(record)
                });
                console.log('record :' + JSON.stringify(products));
                resolve(products)
            })


        })
    },

    // this function used for get product details by using id
    findProductByid: (id) => {
        return new Promise(async (resolve, reject) => {

            postSchema.findById(id, function (err, docs) {
                if (err) {
                    console.log(err);
                }
                else {
                    //console.log("Result : ", docs);
                    resolve(docs)
                }
            }).lean()
        })
    },

    // change total amount of notebook and apply offer
    changeTotalAmount_notebook: (value) => {
        return new Promise(async (resolve, reject) => {
            let totalAmount = value * 100
            if (totalAmount >= 500) {
                let discount = totalAmount * (10 / 100)
                if (discount >= 60) {
                    discount = 60
                }
                totalAmount = totalAmount - discount
                let msg = 'offer applied'
                resolve({ totalAmount, msg })

            } else {
                let msg = 'offer not applied'
                resolve({ totalAmount, msg })


            }

        })
    },

    // change total amount of sanitizer and apply offer
    changeTotalAmount_sanitizer: (value) => {

        return new Promise(async (resolve, reject) => {
            let totalAmount = value * 250
            if (totalAmount >= 3000) {
                let discount = 100

                totalAmount = totalAmount - discount
                let msg = 'offer applied'
                resolve({ totalAmount, msg })

            } else {
                let msg = 'offer not applied'
                resolve({ totalAmount, msg })


            }

        })
    },

    //// change total amount of bag and apply offer
    changeTotalAmount_bag: (value) => {
        return new Promise(async (resolve, reject) => {
            let totalAmount = value * 1500
            resolve({ totalAmount })

        })
    },

    // products add to cart
    addtoCart: (ids, totalAmount) => {
        return new Promise(async (resolve, reject) => {

            let product = {
                product_id: ids,
                total_price: totalAmount
            }
            const cartExist = await cartSchema.exists({ product_id: ids })
            console.log('ce' + JSON.stringify(cartExist));
            if (!cartExist) {
                cartSchema.collection.insertOne(product, function (err, docs) {
                    if (err) {
                        return console.error(err);
                    } else {

                        finalAmount = Number(finalAmount) + Number(totalAmount)
                        console.log('final amount' + finalAmount);


                        resolve({ ids, finalAmount })
                    }
                });
            } else {


                resolve({ ids, finalAmount })
            }




        })
    },

    // add promocode 
    addPromocode: (code, amount) => {
        return new Promise(async (resolve, reject) => {
            if (amount >= 10000) {
                if (code == 'PRIME123') {
                    amount = amount - 123
                    let msg = 'promocode applied'
                    resolve({ amount, msg })
                } else {
                    let msg = 'promocode not valid'
                    resolve({ amount, msg })
                }
            } else {
                let msg = 'total amount less than 10000'
                resolve({ amount, msg })
            }

        })

    },
    buyProduct: () => {
        return new Promise(async (resolve, reject) => {
            finalAmount = 0
            cartSchema.remove({},(err,doc)=>{
                resolve()
            })
            
        })
    }
}