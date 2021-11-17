import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, update, user }) => {
  const [infoVisible, setInfoVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [deleted, setDeleted] = useState(false)

  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }
  const showIfUserMatches = { display: user.name === blog.user.name ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const incrementLikes = () => {
    const blogCopy= blog
    blogCopy.likes = blog.likes + 1
    update(blogCopy)
    setLikes(likes + 1)
  }

  const deleteBlog = async id => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      await blogService.setToken(user.token)
      await blogService.remove(id)
      setDeleted(true)
    }
  }

  if (!deleted) {
    return (
      <div style={blogStyle}>
        <div id='title' style={hideWhenVisible}>
          <p>
            {blog.title} {blog.author}
            <button id="view-button" onClick={() => setInfoVisible(true)}>View</button>
          </p>
        </div>

        <div style={showWhenVisible}>
          <p>
            {blog.title} {blog.author}
            <button onClick={() => setInfoVisible(false)}>Hide</button>
          </p>
          <p>{blog.url}</p>
          <p>
            Likes {blog.likes}
            <button id="like-button" onClick={() => incrementLikes()}>Like</button>
          </p>
          <p>{blog.user.name}</p>
          <button id="remove-button" style={showIfUserMatches} onClick={() => deleteBlog(blog.id)}>Remove</button>
        </div>
      </div>
    )
  }
  else {
    return null
  }
}

export default Blog