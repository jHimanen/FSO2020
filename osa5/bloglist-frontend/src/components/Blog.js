import React, {useState} from 'react'

const Blog = ({ blog, update }) => {
  const [infoVisible, setInfoVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

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

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p>
          {blog.title} {blog.author}
          <button onClick={() => setInfoVisible(true)}>View</button>
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
          <button onClick={() => incrementLikes()}>Like</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog