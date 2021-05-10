const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    await response.json(blogs)
})
  
blogsRouter.post('/', (request, response) => {
    console.log(request)
    const blog = new Blog(request.body)
    
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogsRouter