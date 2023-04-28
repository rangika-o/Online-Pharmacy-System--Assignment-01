require('./db.js')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

var itemRoutes = require('./routes/item')

var app = express()
app.use(bodyParser.json())
app.use(cors({origin:'*'}))
app.listen(4000,()=>console.log('Server started at : 4000'))

app.use('/Item',itemRoutes)
app.use(express.static('public'))