require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require("./router/index")
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000
const app = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(cors())

app.use('/resource', express.static(__dirname + '/resource'));
app.use('/api', router)



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