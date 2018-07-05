const express = require('express')
const router = express.Router()
const models = require('../models')

router.get('/',(req,res) => {
    models.Client.findAll({
        order : [
            ["id","ASC"]
        ]
    })
    .then(function(client){
        res.render('../views/client/client',{dataClient:client})
    })
})



router.get('/addClient',(req,res) => {
    res.render('../views/client/register')
})

router.post('/',(req,res) => {
    models.Client.create(req.body)
    .then(function(client){
        // res.render('../views/client/client',{dataClient:client})
        res.redirect('/client')
    })
})

router.post('/ceklogin',(req,res) => {
    models.Client.findOne({
        where : {username : req.body.username,
                password : req.body.password}
    })
    .then(function(data){
        // console.log(data);
        if(data.length === null){
            res.redirect('/login')
        }else{
            res.redirect('/homelogin')
        }
        
    })
    .catch(err => {
        // res.send('err')
        res.redirect('/login')
    })
})

router.get('/editClient/:id',(req,res) => {
    models.Client.findById(req.params.id)
    .then(client => {
        // console.log(client);
        // res.send(client)
        res.render('../views/client/edit',{dataClient : client})
    })
})

router.post('/editClient/:id',(req,res) => {
    models.Client.update({
        name : req.body.name,
        address : req.body.address,
        phoneNumber : req.body.phoneNumber,
        saldo : req.body.saldo
    },{where : {id:req.params.id}})
    .then(function(){
        res.redirect('/client')
    })
})

router.get('/deleteClient/:id',(req,res)=> {
    models.Client.destroy({where :{id : req.params.id}})
    .then(function(){
        res.redirect('/client')
    })
})

module.exports = router