const express = require('express')
const app = express()
const models = require('./models')
const bodyParser = require('body-parser')
var session = require('express-session')

app.set('trust proxy', 1)

app.set('view engine','ejs')

app.use(bodyParser.urlencoded());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    }   
  )
)

app.locals.helper= require('./helper/kota')
app.locals.helperRp = require('./helper/Rp')



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