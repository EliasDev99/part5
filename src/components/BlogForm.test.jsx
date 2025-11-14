import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, describe, expect, vi } from 'vitest'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls the event handler it received with the right details when a new blog is created.', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm onCreate={createBlog} />)

    const titleInput = screen.getByLabelText('title:')
    const authorInput = screen.getByLabelText('author:')
    const urlInput = screen.getByLabelText('url:')
    const submitButton = screen.getByText('create')

    await user.type(titleInput, 'Test create form')
    await user.type(authorInput, 'Matti')
    await user.type(urlInput, 'https://fullstack2025.com')
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog).toHaveBeenCalledWith({
      title: 'Test create form',
      author: 'Matti',
      url: 'https://fullstack2025.com',
    })
  })
})
