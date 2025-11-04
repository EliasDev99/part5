import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import loginService from './services/login'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
   const [user, setUser] = useState(null)
 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

   const handleLogin = async (username, password) => {

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if(user === null) {
    return (
      <>
        <Notification message={errorMessage} />
        <LoginForm onLogin={handleLogin} />
      </>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
       {blogs.map(blog => <Blog key={blog.id} blog={blog} /> )}
    </div>
  )
}

export default App