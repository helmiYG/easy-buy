const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    res.send('jalan')
})

router.get('/homeLogin',(req,res) => {
    res.send('masuk home login')
})



module.exports = router