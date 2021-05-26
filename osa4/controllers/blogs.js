const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1, id: 1 })
    await response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const token = request.token
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog.toJSON())
    } catch (exception) {
        if (exception.name === 'ValidationError') {
            return response.status(400).json({ error: exception.message })
        }
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const userID = decodedToken.id
    const toBeDeleted = await Blog.findById(request.params.id)

    if (!token || !userID) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (userID != toBeDeleted.user) {
        return response.status(401).json({ error: 'not authorized to delete this blog' })
    }
    
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const res = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(res)
})

module.exports = blogsRouter