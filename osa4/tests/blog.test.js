const listHelper = require('../utils/list_helper')

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