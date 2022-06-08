const { json } = require('body-parser');
const { Router } = require('express');

const hbs = require('express-handlebars');
const userController = require('../Controllers/userController')
const router = Router()

// home route
router.get('/', (req, res) => {
    userController.fetchProducts().then((response) => {


        res.render('home', { products: response })


    }).catch((err) => {
        res.status(400).send(err);
    });


})

// product details route
router.get('/product', (req, res) => {
    console.log(req.query.id);
    userController.findProductByid(req.query.id).then((response) => {
        console.log(response);
        const totalPrice = response.quantity * response.price
        res.render('product', { prdct: response, totalPrice })
    })



})

// change quantity and price of product
router.post('/add-quantity', async (req, res) => {
    let value = req.body.quantity
    let id = req.body.id
    //console.log('v:'+value,'id '+id);

    const product = await userController.findProductByid(id)



    if (product._id == '629f4779678bc26b2b66c2f4') {
        userController.changeTotalAmount_notebook(value).then((response) => {
            console.log(response);
            res.json(response)
        })

    }
    if (product._id == '629f4779678bc26b2b66c2f5') {
        userController.changeTotalAmount_sanitizer(value).then((response) => {
            console.log(response);
            res.json(response)
        })
    }
    if (product._id == '629f4779678bc26b2b66c2f6') {
        userController.changeTotalAmount_bag(value).then((response) => {
            console.log(response);
            res.json(response)
        })
    }
})


// products add to cart
router.post('/cart', async (req, res) => {
    let value = await req.body.quantity
    let id = await req.body.id
    let totalAmount = await req.body.totalPrice
    console.log('tp' + totalAmount);
    userController.addtoCart(id, totalAmount).then((response) => {
        console.log('fAmount' + response.finalAmount);
        let finalAmount = response.finalAmount



        res.render('cart', { amount: finalAmount })
    })
})

//apply promocode for cart

router.post('/add-promocode', (req, res) => {
    const code = req.body.code
    const amount = req.body.amount
    console.log('code', req.body.code, ' amount ', req.body.amount);
    userController.addPromocode(code, amount).then((response) => {
        res.json(response).status(200)
    })
})

// buy products

router.get('/buyNow',(req,res)=>{
    userController.buyProduct().then((response)=>{
        res.redirect('/')
    })
})

module.exports = router