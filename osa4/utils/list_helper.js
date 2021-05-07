const _ = require('lodash')

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce((total, num) => total + num, 0)
}

const favoriteBlog = (blogs) => {
    var mostLikes = 0
    var favorite = {}

    const formulate = (blog) => {
        delete blog.id
        delete blog.url
        delete blog.__v

        return blog
    }

    blogs.forEach(blog => {
        if (blog.likes > mostLikes) {
            favorite = formulate(blog)
            mostLikes = blog.likes
        }
    })

    return favorite
}

const mostBlogs = (blogs) => {

    if (!blogs) {
        return {}
    }

    const authors = blogs.map(blog => blog.author)

    const res = _(authors)
        .countBy()
        .entries()
        .maxBy(_.last)

    return {
        author: _.head(res),
        blogs: _.last(res)
    }

}

const mostLikes = (blogs) => {

    if (!blogs) {
        return {}
    }
    
    const res = _(blogs)
        .groupBy('author')
        .mapValues(totalLikes)
        .entries()
        .maxBy(_.last)

    return {
        author: _.head(res),
        likes: _.last(res)
    }
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}