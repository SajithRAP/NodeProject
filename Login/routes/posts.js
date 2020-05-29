const router = require('express').Router();
const verifytoken = require('./verifyToken')

router.get('/', verifytoken , (req, res) => {
    res.send('data loaded');
})

module.exports = router;