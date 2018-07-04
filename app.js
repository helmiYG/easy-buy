const express = require('express')
const bodyparser = require('body-parser')
const app = express()
app.use(bodyparser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')


app.locals.helper = require('./helper/rating')



const homeRoutes = require('./routes/home')
app.use('/', homeRoutes)

// const itemRoutes = require('./routes/item')
// app.use('/item', itemRoutes)

const adminRoutes = require('./routes/admin')
app.use('/admin', adminRoutes)

app.listen(3000, console.log('connected !!'))