const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const bodyparser = require('body-parser');
const expressWs = require('express-ws');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.options('*', cors());
var usersRouter = require('./routes/users');
var marketplacesRouter = require('./routes/marketplaces');
var productsRouter = require('./routes/products');

// Connect Database
connectDB();
const wsInstance = expressWs(app);
// Init Middleware

app.use(express.json({ extended: false }));
app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));
// Define Routes

app.use('/users', usersRouter);
app.use('/signUp', usersRouter);
app.use('/signIn', usersRouter);
app.use('/marketplaces', marketplacesRouter);
app.use('/products', productsRouter);
//For cors 

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
