const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const keys = require('../config/default');
const product = require('../models/product');
const marketplace = require('../models/marketplace');
const passport = require("passport");

router.post('/addproduct', async (req,res) => {

    const notif = new product(
        req.body
    );
    try {
        const savedComment = await notif.save();
        res.send(savedComment); 
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
})
router.get('/getAllProducts' , (req,res) => {
        product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error' + err));
});
router.get('/getProductsByMarketplace/:id' ,async (req, res, next) => {

    const marketPlace =await marketplace.findById(req.params.id);
    product.find({marketplace:marketPlace})
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error' + err));

});
//For fruit Transfer
router.post('/TransferFromCountryToAnother' ,(req, res, next) => {
    const marketPlace = marketplace.find({"country":req.body.CountryForTransfert});
   let doc =  product
   .findOneAndUpdate({"_id":req.body.prod._id},{$inc : {"stock" :-req.body.Quantity}}
   ,{useFindAndModify: false},(err, document) => {
    if (err) return err;
    //console.log(document);
    res.send({ document });  
});
});
router.post('/UpdateTheQuantityOfCountry' ,async(req, res, next) => {
const marketPlace = await marketplace.find({"country":req.body.CountryForTransfert});
const doc=await product.findOneAndUpdate(product.find({$and: [{"marketplace":marketPlace},{"name":req.body.prod.name}]}), {$inc : {"stock" :req.body.Quantity/2}}, {new: true, upsert: true},(err, document) => {
    if (err) return err;
    //console.log(document);
    res.send({ document });  
});



});
module.exports = router;