const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'First post',
        author: 'Jenna Julkunen',
        url: 'http://www.yle.fi/~jenna',
        likes: 6
    },
    {
        title: 'Second post',
        author: 'Jami Jantunen',
        url: 'http://www.yle.fi/~jami',
        likes: 8
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

const listWithOneBlog = [
    {
        id: '5a422aa71b54a676234d17f8',
        title: 'Yes hello',
        author: 'Jarmo',
        url: 'http://www.yle.fi/~ransu',
        likes: 10,
        __v: 0
    }
]

const listWithMultipleBlogs = [
    {
        id: '5a422aa71b54a676234d17f8',
        title: 'Yes hello',
        author: 'Jarmo',
        url: 'http://www.yle.fi/~ransu',
        likes: 10,
        __v: 0
    },
    {
        id: '5a422aa71b54a676234d17g7',
        title: 'No goodbye',
        author: 'Jenna',
        url: 'http://www.yle.fi/~jyrki',
        likes: 11,
        __v: 1
    },
    {
        id: '5a422aa71b54a676234d17h6',
        title: 'Just hi',
        author: 'Jimi',
        url: 'http://www.yle.fi/~neponen',
        likes: 14,
        __v: 2
    },
    {
        id: '5a422aa71b54a676234d17i5',
        title: 'Lol',
        author: 'Jenna',
        url: 'http://www.yle.fi/~toljanteri',
        likes: 5,
        __v: 3
    }
]

describe('Basic tests', () => {

    test('Amount of returned blogs is correct', async () => {
        const res = await api.get('/api/blogs')
        expect(200)
        expect(res.body).toHaveLength(initialBlogs.length)
    })

    test('Each blog has an ID', async () => {
        const res = await api.get('/api/blogs')
        expect(200)
        res.body.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    })

    test('Adding a blog post succeeds', async () => {
        const newBlog = {
            title: 'Test',
            author: 'Tester',
            url: 'http://www.test.com/',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await Blog.find({})
        expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
    })

    test('Default amount of likes is zero', async () => {
        const newBlog = {
            title: 'Test',
            author: 'Tester',
            url: 'http://www.test.com/'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const latest = await Blog.find({title: 'Test'})
        expect(latest[0].likes).toEqual(0)
    })

    test('Posting a blog without title or URL yields status code 400', async () => {
        const noTitle = {
            author: 'NoTitle',
            url: 'http://www.test.com/'
        }
        const noURL = {
            title: 'No URL',
            author: 'Dummy'
        }

        await api
            .post('/api/blogs')
            .send(noTitle)
            .expect(400)
        await api
            .post('/api/blogs')
            .send(noURL)
            .expect(400)

        const blogsAtEnd = await Blog.find({})
        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    })
})

describe('Total likes', () => {

    test('when list is empty equals zero', () => {
        const res = listHelper.totalLikes([])
        expect(res).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const res = listHelper.totalLikes(listWithOneBlog)
        expect(res).toBe(10)
    })

    test('when list has multiple blogs equals the total likes', () => {
        const res = listHelper.totalLikes(listWithMultipleBlogs)
        expect(res).toBe(40)
    })
})

describe('Favorite blog', () => {

    test('when list is empty equals empy object', () => {
        const res = listHelper.favoriteBlog([])
        expect(res).toEqual({})
    })

    test('when list contains single blog equals that one', () => {
        const res = listHelper.favoriteBlog(listWithOneBlog)
        expect(res).toEqual({
            title: 'Yes hello',
            author: 'Jarmo',
            likes: 10
        })
    })

    test('when list contains multiple blogs equals the one with most likes', () => {
        const res = listHelper.favoriteBlog(listWithMultipleBlogs)
        expect(res).toEqual({
            title: 'Just hi',
            author: 'Jimi',
            likes: 14
        })
    })
})

describe('Most blogs', () => {

    test('when list is empty equals empty object', () => {
        const res = listHelper.mostBlogs([])
        expect(res).toEqual({})
    })

    test('when list contains a single blog equals its author', () => {
        const res = listHelper.mostBlogs(listWithOneBlog)
        expect(res).toEqual({
            author: 'Jarmo',
            blogs: 1
        })
    })

    test('when list contains multiple blogs equals the author with most blogs', () => {
        const res = listHelper.mostBlogs(listWithMultipleBlogs)
        expect(res).toEqual({
            author: 'Jenna',
            blogs: 2
        })
    })
})

describe('Most likes', () => {

    test('when list is empty equals empty object', () => {
        const res = listHelper.mostLikes([])
        expect(res).toEqual({})
    })

    test('when list contains a single blog equals the author with most likes', () => {
        const res = listHelper.mostLikes(listWithOneBlog)
        expect(res).toEqual({
            author: 'Jarmo',
            likes: 10
        })
    })
    
    test('when list contains multiple blogs equals the author with most likes', () => {
        const res = listHelper.mostLikes(listWithMultipleBlogs)
        expect(res).toEqual({
            author: 'Jenna',
            likes: 16
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})