import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationObject, setNotificationObject] = useState({})
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const changeNotification = (type, message) => {
    setNotificationObject({type, message})
    setTimeout(() => {
      setNotificationObject({})
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch (error) {
      changeNotification('error', 'Wrong username or password!')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out', user.username)
    window.localStorage.clear()
    setUser(null)
  }

  const submitBlog = async (event) => {
    event.preventDefault()
    await blogService.setToken(user.token)

    const res = await blogService.create({
      title: title,
      author: author,
      url: url
    })
    console.log(res)

    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
    changeNotification(
      'success', `A new blog "${title}" by ${author} added!`
    )
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (user === null) {
    return (
      <div>
        <Notification type={notificationObject.type} message={notificationObject.message} />
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <Notification type={notificationObject.type} message={notificationObject.message} />
        <h1>Blogs</h1>
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>Logout</button>
        </div>
        <h1>Create new</h1>
        <form onSubmit={submitBlog}>
          <div>
            Title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            Author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            URL:
            <input
              type="text"
              value={url}
              name="URL"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    )
  }
}

export default App