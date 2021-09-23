const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = (request, response, next) => {
    const token = request.token
    console.log(token)
    if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (decodedToken) {
            const user = User.findById(decodedToken.id)
            request.user = user
        }
    }
    next()
}

module.exports = userExtractor