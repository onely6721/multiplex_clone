const jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports = (req, res, next) => {
    try {
        if (req.user.role === 'admin')
            next()
        else
            return res.status(403).json({message:"Нету доступа"})
    } catch (e) {
        res.status(401).json({ message: e.message })
    }
};