const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const keys = require('../config/default');
const marketplace = require('../models/marketplace');
const passport = require("passport");

// router.route('/getAllMarketplaces').get(passport.authenticate('jwt', { session: false }), AnnoncesController.mesAnnonces);
router.post('/addmarket', async (req,res) => {

        const notif = new marketplace(
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
router.get('/getAllMarketplaces' , (req,res) => {
         marketplace.find()
        .then(marketplaces => res.json(marketplaces))
        .catch(err => res.status(400).json('Error' + err));
});
module.exports = router;