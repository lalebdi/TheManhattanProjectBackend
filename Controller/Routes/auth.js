// setting up the routes for the server
const route = require('express').Router();
const userModel = require('../../Model/userModel');

// the /user is the end point of the route
route.post('/user', (req,res) => {
    userModel.create(req.body).then((user) => {
        if(!user) return res.status(400).send('there was an error')
        res.send('created user')
    })
    .catch((err) => res.status(400).send(err))
})
//  put is for updates
route.put('/user', (req,res) => {
    const {id, name, password, role} = req.body
    userModel.findByIdAndUpdate(id,{name,password,role}).then((user) => {
        if(!user) return res.status(400).send('no user')
        res.send('updated')
    })
    .catch((err) => {
        if(err)res.status(400).send(err)
    })
})
// thats for logging in
.post('/', (req,res) => {
    userModel.findOne(req.body).then((user) =>{
        if(!user) return res.status(400).send('incorrect email / password')
        res.cookie('user' , user) //saving the user info as a cookie
        res.send(true)
    })
    .catch((err) =>{
        if(err) res.status(400).send(err)

    })
})

.get('/', (req,res) => {
    userModel.find().then((user) => {
        if(!user) return res.status(400).send('no users')
        res.send(user)
    })
    .catch((err) => {
        if(err) res.status(400).send(err)
    })
})

module.exports = route