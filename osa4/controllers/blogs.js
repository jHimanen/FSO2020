const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    await response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    try {
        const blog = new Blog(request.body)
        const savedBlog = await blog.save()

        response.status(201).json(savedBlog)
    } catch (exception) {
        if (exception.name === 'ValidationError') {
            return response.status(400).json({ error: exception.message })
        }
    }
})

module.exports = blogsRouter