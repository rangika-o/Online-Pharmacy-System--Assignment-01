require('./db.js')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

var userRoutes = require('./routes/users')
var itemRoutes = require('./routes/item')
var cartRoutes = require('./routes/cart')

var app = express()
app.use(bodyParser.json())
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 ,
    methods: "GET, PUT"
}
app.use(cors(corsOptions));
app.listen(3500,()=>console.log('Server started at : 3500'))

app.use('/user',userRoutes)
app.use('/Item',itemRoutes)
app.use('/cart',cartRoutes)
app.use(express.static('public'))