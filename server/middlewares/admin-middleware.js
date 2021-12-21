const jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: 'Неавторизованый' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        if( decoded.role === 'admin') {
            req.user = decoded
            next()
        } else
        {
            res.status(401).json({ message: 'Нету прав' })
        }


    } catch (e) {
        res.status(401).json({ message: 'Неавторизованый' })
    }
};