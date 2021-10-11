require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require("multer");
const router = require("./router/index")


const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './resource/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })
app.use('/resource', express.static(__dirname + '/resource'));
app.use('/api', router)

app.post('/api/photo',upload.single('avatar'), (req, res) => {
    try {
        console.log(req.file)
        return res.json(req.file)
    } catch (e) {
        console.log(e.message)
    }

})

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Serve started at ${PORT} port`))
    } catch (e) {
        console.log(e.message)
    }
}


start()