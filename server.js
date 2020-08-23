require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const app = express();

// now connecting to the mogo, its a url, option and error
mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true }, (err) =>{
    if(!err) console.log('connected to the DB')
    console.log(err)
})

const PORT = process.env.PORT || 3500

// initializing middlewhere in the server
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())

// setting up the auth as route
app.use('/auth', require('./Controller/Routes/auth'))

app.listen(PORT, () =>{
    console.log('listening on ' + PORT)
})