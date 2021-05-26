const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = (request, response, next) => {
    console.log(request)
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = User.findById(decodedToken.id)
    request.user = user
    next()
}

module.exports = userExtractor