var express = require('express');
var router = express.Router();
const JWT = require('jsonwebtoken');
var randomstring = require("randomstring");
const passport = require("passport");
var bcrypt = require('bcryptjs');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
signToken = user => {
  return JWT.sign({
      iss: 'DropLost',
      sub: user.id,

  }, 'DropLostToken');
}
//For Log in

router.route('/signIn').post(validateBody(schemas.SignInauthSchema),async (req, res, next) => {
   //find the user 
   const user = await User.findOne({ "email": req.body.email });
   if(user==null){
    return   res.status(400).send("Email incorrecte");
   }
   const isMatch = await user.isValidPassword(req.body.password);
   if (!isMatch) {
     return   res.status(400).send("Mot de passe incorrecte");
   }
  
   if(user!=null&&isMatch==true){
    const token = signToken(req.body.email);
    res.cookie('access_token', token);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.status(200).json({ Token: token });

   }

});
//For registration
router.post('/signup',async (req, res, next) => {
  st = randomstring.generate();
  try {
      // create new user 
  const newUser = new User({
    role: 'superadmin',
    method: 'local',
    nom: "admin",
    ville: "Paris",
    adresse: "Paris",
    numero: 0454545,
    email: "admin@gmail.com",
    password: "admin",
    Isactive: true,
    secretToken: st
});
    const user = await newUser.save();
    res.send(user); 
}catch(err){
    console.log(err);
    res.status(400).send(err);
}

});

module.exports = router;
