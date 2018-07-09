const express = require('express')
const router = express.Router()
const aps = express()
const models = require('../models')

// router.get('/order',(req,res) => {
//     models.Item.findAll()
//     .then(function(allItems){
//         console.log(req.session);
//         res.render('pesanbarang',{allItems})
//     })
// })

// router.get('')

module.exports = router