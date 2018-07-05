const express = require('express')
const app = express()

const models = require('./models')
const bodyParser = require('body-parser')


app.set('view engine','ejs')

app.use(bodyParser.urlencoded());

var registerRouter = require('./routes/register')
app.use('/register',registerRouter)

var loginRouter = require('./routes/login')
app.use('/login',loginRouter)

var indexRoutes = require('./routes/index')
app.use('/',indexRoutes)


var clientRoutes = require('./routes/client')
app.use('/client',clientRoutes)

app.listen(3000, ()=> {
    console.log('jalan');
})