import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test, describe, expect, beforeEach } from 'vitest'

describe('<Blog />', () => {
  const blog = {
    title: 'Testing react app ',
    author: 'Matti',
    url: 'https://fullstackhelsinki',
    likes: 10,
    user: { username: 'juhamatti', name: 'Juha', id: '123' },
  }

  const user = { username: 'juhamatti', name: 'Juha' }

  beforeEach(() => {
    render(<Blog blog={blog} user={user} />)
  })

  test('show title and author, but not url or likes by default', () => {
    const element = screen.getByText('Testing react app Matti')
    expect(element).toBeVisible()

    const showDetails = screen.queryByText('https://fullstackhelsinki')
    expect(showDetails).toBeNull()

    const likes = screen.queryByText('likes')
    expect(likes).toBeNull()
  })

  test('likes and url shown after clicking the view button', async () => {
    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(screen.getByText('https://fullstackhelsinki')).toBeVisible()
    expect(screen.getByText('likes 10')).toBeVisible()
  })
})
