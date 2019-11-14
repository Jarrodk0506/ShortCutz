const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/shortcutzdb";

const db = require("./config/keys").mongoURI;
//replaced db with MONGODB_URI -- test--
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});