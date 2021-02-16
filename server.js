const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const cors = require('cors')
const csurf = require('csurf')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config()


const app = express()

// Initial dependencies in middleware
app.use(helmet())
app.use(cors())
// app.use(csurf())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(morgan('dev'))


// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        all: 'working'
    })
})

// Static on  production build
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


// Config server
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'localhost'

app.listen(PORT, err => {
    err 
        ? console.log('❌ Server is not running. ' + err)
        : console.log(`✔️  Server is running on http://${HOST}:${PORT}`)
})