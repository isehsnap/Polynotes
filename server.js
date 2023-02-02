if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')


const loginRouter = require('./routes/login')
const homeRouter = require('./routes/home')
const forgotRouter = require('./routes/forgot')
const firstConnectionRouter = require('./routes/firstConnection')
const resetPasswordRouter = require('./routes/resetPassword')
const searchGradesRouter = require('./routes/searchGrades')
const uploadGradesRouter = require('./routes/uploadGrades')
const uploadModelRouter = require('./routes/uploadModel')
const viewGradesRouter = require('./routes/viewGrades')
const logoutRouter = require('./routes/logout')


const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use(express.json())
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

app.use('/', loginRouter)
app.use('/home', homeRouter)
app.use('/forgot', forgotRouter)
app.use('/firstConnection', firstConnectionRouter)
app.use('/resetPassword', resetPasswordRouter)
app.use('/searchGrades', searchGradesRouter)
app.use('/uploadGrades', uploadGradesRouter)
app.use('/uploadModel', uploadModelRouter)
app.use('/viewGrades', viewGradesRouter)
app.use('/logout', logoutRouter)

app.listen(process.env.PORT || 3000)
