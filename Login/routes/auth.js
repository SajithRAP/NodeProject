const router = require('express').Router();
const User = require('../Model/User');

// Joi validator
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validationschema = Joi.object(
    {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
);

const validationschemadata = Joi.object(
    {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
);


router.post('/register', async (req, res) => {
    // res.send('Register')

    // valid data with joi
    const { error } = validationschema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    const emailduplicateExist = await User.findOne({email : req.body.email});
    if(emailduplicateExist) {
        return res.status(400).send('Email already exists');
    }

    // password crypt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt) 
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/login', async (req, res) => {
    
    const { error } = validationschemadata.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({email : req.body.email});
    if(!user) {
        return res.status(400).send('Email already exists');
    }
    const validateLoginPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validateLoginPassword) {
        return res.status(400).send('Credentials Invalid');
    }

    // craete and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    // res.send('logged in')
})

module.exports = router;