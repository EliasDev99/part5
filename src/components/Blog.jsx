import { useState } from 'react'
import blogService from '../services/blogs.js'

const Blog = ({ blog, onLike, onDelete, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const buttonStyle = {
    backgroundColor: '#4FC3F7',
    border: 'none',
    padding: '2px 6px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updateBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    const updatedBlog = await blogService.update(blog.id, updateBlog)
    onLike({ ...updatedBlog, user: blog.user })
  }

  const handleDelete = async (id) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (ok) {
      await blogService.remove(blog.id)
      onDelete(blog.id)
    }
  }

  const hidDeleteButton =
    user && blog.user && user.username === blog.user.username

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        {'  '}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>

      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user?.name}</p>
          {hidDeleteButton && (
            <button style={buttonStyle} onClick={handleDelete}>
              {' '}
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
