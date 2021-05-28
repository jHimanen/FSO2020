import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationObject, setNotificationObject] = useState({})
  const [user, setUser] = useState(null)

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

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      console.log('Logging in with', credentials.username, credentials.password)

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUser(user)

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

  const submitBlog = async (blogObject) => {
    await blogService.setToken(user.token)

    const res = await blogService.create(blogObject)
    console.log(res)

    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
    changeNotification(
      'success', `A new blog "${blogObject.title}" by ${blogObject.author} added!`
    )
  }

  const updateBlog = (blog) => {
    blogService.update(blog.id, blog)
  }

  if (user === null) {
    return (
      <div>
        <Notification type={notificationObject.type} message={notificationObject.message} />
        <LoginForm login={handleLogin}/>
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

        <Togglable buttonLabel="Create new blog">
          <BlogForm createBlog={submitBlog}/>
        </Togglable>

        <div>
          {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} update={updateBlog}/>
          )}
        </div>
      </div>
    )
  }
}

export default App