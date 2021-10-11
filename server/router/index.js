const Router = require('express').Router;
const router = new Router();


router.get('/hello', (req, res) => {
    return res.status(200).json({message:"text"})
})

module.exports = router