const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
require('dotenv').config()


mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
logger.info('Connected to MongoDB')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)


module.exports = app