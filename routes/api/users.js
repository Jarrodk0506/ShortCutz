const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


const User = require('../../models/User');

//Registration for users
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const online = req.body.online;
    const barber = req.body.barber;

    User.findOne({ email, barber }).then(user => {
        if (user) return res.status(400).json({ email: "Email already exists" });

        const newUser = new User({
            name,
            email,
            password,
            online,
            barber
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;

                newUser.password = hash;
                newUser.save().then(user => res.json(user)).catch(err => console.log(err));
            });
        });
    });
});

// Registration for barbers
router.post('/registerb', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const barber = req.body.barber;

    Barber.findOne({ email, barber }).then(barber => {
        if (barber) return res.status(400).json({ email: "Email already exists" });

        const newBarber = new Barber({
            name,
            email,
            password,
            barber
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newBarber.password, salt, (err, hash) => {
                if (err) throw err;

                newBarber.password = hash;
                newBarber.save().then(barber => res.json(barber)).catch(err => console.log(err));
            });
        });
    });
});

//User login
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;
    const barber = req.body.barber;

    User.findOne({ email, barber }).then(user => {
        if (!user) return res.status(404).json({ emailnotfound: "Email not found" });

        bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) return res.status(400).json({ passwordincorrect: "Password incorrect" });

            const payload = {
                id: user.id,
                name: user.name,
                barber: user.barber
            };

            jwt.sign(payload, keys.cypher, { expiresIn: 31556926 }, (err, token) => {
                if (err) return res.status(400).json({ tokenerror: "There was a problem updating your security token" });
                res.json({
                    success: true,
                    token: "Bearer " + token,
                });
            });
        });
    });
});

//Barber Login
router.post('/loginb', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;
    const barber = req.body.barber;

    Barber.findOne({ email, barber }).then(barber => {
        if (!barber) return res.status(404).json({ emailnotfound: "Email not found" });

        bcrypt.compare(password, barber.password).then(isMatch => {
            if (!isMatch) return res.status(400).json({ passwordincorrect: "Password incorrect" });

            const payload = {
                id: barber.id,
                name: barber.name,
                barber: barber.barber
            };

            jwt.sign(payload, keys.cypher, { expiresIn: 31556926 }, (err, token) => {
                if (err) return res.status(400).json({ tokenerror: "There was a problem updating your security token" });
                res.json({
                    success: true,
                    token: "Bearer " + token,
                });
            });
        });
    });
});

// get users in the database with barber:true status to display on the dashboard for users.
router.get("/", (req, res) => {
    const query = {barber : true, online: true};
    
    User.find(query)
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) });
});

//making post route for changing online status
router.post("/dashboard", (req, res) => {

    const online = req.body.online;
    console.log("this is the check" + online);

    User.update({ _id: req.params.id },{"$set":{"online":online}})
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
});

module.exports = router;