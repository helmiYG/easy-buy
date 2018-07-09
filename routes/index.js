const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    // res.send('jalan')
    res.render('halamanUtama')
})

router.get('/homeLogin',(req,res) => {
    // res.send('masuk home login')
    res.render('homeLogin')
})



module.exports = router