const express = require('express')
const router = express.Router()
const aps = express()
const models = require('../models')
const bcrypt = require('bcrypt'); 
const saltRounds = 10;
const plainText = 'not_bacon';
var schedule = require('node-schedule') 
var mailer = require('nodemailer')

var session = require('express-session')
aps.set('trust proxy', 1)


router.post('/ceklogin',(req,res) => {
    models.Client.findAll({
        where : {username : req.body.username}
    })
    .then(kode => {
        // res.send(kode)
        var password = req.body.password
        var newPass = bcrypt.compareSync(password, kode[0].password)
        // req.session.client = 
        // res.send(newPass)
        if(newPass === true){
            req.session.client = kode
            // res.redirect('/client')
            console.log(req.session.client);
            
            res.render('../views/client/dashboard')
        }else{
            res.redirect('/login')
        }
        
    })
})

var sessionChecker = (req, res, next) => {
    if (!req.session.client) {
        res.redirect('/');
    } else {
        next();
    }    
};

var name = aps.use(function(req,res,next){
    // console.log(req.session);
    return req.session.client[0].username
})

router.get('/',sessionChecker,(req,res) =>{

    
    res.render('../views/client/dashboard')
})

router.get('/all',sessionChecker,(req,res) => {
    // console.log(req.session.client[0].name);
    // console.log();
    login = req.session.client[0].name
    console.log(login);
    // res.send(login)
    models.Client.findAll({where : {name : login}})
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
        // res.render('../views/client/dashboard')
        // res.redirect('/homelogin')
        res.redirect('/login')
    })
    .catch(err => {
        // res.send(err.message)
        // res.render('../views/client/register',{err : err.message})
        res.send(err.message)
    })
})



router.get('/editClient/:id',sessionChecker,(req,res) => {
    models.Client.findById(req.params.id)
    .then(client => {
        // console.log(client);
        // res.send(client)
        res.render('../views/client/edit',{dataClient : client})
    })
})

router.post('/editClient/:id',sessionChecker,(req,res) => {
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

router.get('/deleteClient/:id',sessionChecker,(req,res)=> {
    models.Client.destroy({where :{id : req.params.id}})
    .then(function(){
        res.redirect('/')
    })
})


router.get('/order',sessionChecker,(req,res) => {
    models.Item.findAll()
    .then(function(allItems){
        console.log(req.session);
        res.render('pesanbarang',{allItems})
    })
})


router.get("/buy/:id/item", sessionChecker,function (req, res) {
    models.Item.findById(req.params.id)
        .then(function (item) {
            // console.log(req.session);
            var saldo = req.session.client[0].saldo
            res.render('buy', { itemKey: item, saldo : saldo})

        })
})

router.post('/buy/:id/item',sessionChecker,(req,res)=> {
    // models.Item.findById(req.params.id)
    let id = req.params.id
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
     }
     
     var date = new Date();
     
     date.addDays(5);
    models.Item.findById(id)
    .then(function(data){
        let now = new Date()
        var day = now.getDay()
        models.ClientItem.create({
            clientId : req.session.client[0].id,
            itemId : req.params.id,
            purchasePrice : req.body.downPayment,
            orderDate : new Date(),
            maxRepaymentDate : date.addDays(5),
            paymentStatus : false,
            itemArrivalDate : date.addDays(data.preorderAvailablility)
        })
        .then(function(item){
            var lastday = date.addDays(5) - 1
            
                // console.log('tomorrow is your last payment day');

                
           
            // res.redirect('akun')
            res.render('akun',{item,})
        })
    })
})


router.get("/akun", sessionChecker, function (req, res) {

    models.Item.findAll({
    })
        .then(function (itemBought) {
            res.render('akun')
        })


})






router.get('/logout',(req,res)=> {
    req.session.destroy()
    res.redirect('/')
})




module.exports = router