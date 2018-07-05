const express = require('express')
const router = express.Router()
const aps = express()
const models = require('../models')
const bcrypt = require('bcrypt'); 
const saltRounds = 10;
const plainText = 'not_bacon';

var session = require('express-session')
aps.set('trust proxy', 1)

router.post('/ceklogin',(req,res) => {
    models.Client.findAll({
        attributes : ['password'],where : {username : req.body.username}
    })
    .then(kode => {
        var password = req.body.password
        var newPass = bcrypt.compareSync(password, kode[0].password)
        // req.session.client = 
        // res.send(newPass)
        if(newPass === true){
            req.session.client = kode
            res.redirect('/homelogin')
        }else{
            res.redirect('/login')
        }
        console.log(req.session.client);
        
    })
})

var sessionChecker = (req, res, next) => {
    if (!req.session.client) {
        res.redirect('/');
    } else {
        next();
    }    
};

router.get('/',sessionChecker,(req,res) => {
    models.Client.findAll({
        order : [
            ["id","ASC"]
        ]
    })
    .then(function(client){
        res.render('../views/client/client',{dataClient:client})
    })
})



router.get('/addClient',sessionChecker,(req,res) => {
    res.render('../views/client/register')
})

router.post('/',(req,res) => {
    models.Client.create(req.body)
    .then(function(){
        // res.render('../views/client/client',{dataClient:client})
        res.redirect('/')
    })
    .catch(err => {
        // res.send(err.message)
        res.render('../views/client/register',{err : err.message})
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

router.get('/logout',(req,res)=> {
    req.session.destroy()
    res.redirect('/')
})

module.exports = router