import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test, describe, expect, beforeEach, vi } from 'vitest'
import blogService from '../services/blogs'

vi.mock('../services/blogs', () => {
  return {
    default: {
      update: vi.fn((id, blog) => Promise.resolve({ ...blog, id })),
      getAll: vi.fn(),
      create: vi.fn(),
      remove: vi.fn(),
      setToken: vi.fn(),
    },
  }
})

describe('<Blog />', () => {
  const blog = {
    id: '2025fullstack',
    title: 'Testing react app ',
    author: 'Matti',
    url: 'https://fullstackhelsinki',
    likes: 10,
    user: { username: 'juhamatti', name: 'Juha', id: '123' },
  }

  const userInfo = { username: 'juhamatti', name: 'Juha' }
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('show title and author, but not url or likes by default', () => {
    render(<Blog blog={blog} user={userInfo} onLike={vi.fn()} />)
    const element = screen.getByText('Testing react app Matti')
    expect(element).toBeVisible()

    const showDetails = screen.queryByText('https://fullstackhelsinki')
    expect(showDetails).toBeNull()

    const likes = screen.queryByText('likes')
    expect(likes).toBeNull()
  })

  test('likes and url shown after clicking the view button', async () => {
    render(<Blog blog={blog} user={userInfo} onLike={vi.fn()} />)
    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(screen.getByText('https://fullstackhelsinki')).toBeVisible()
    expect(screen.getByText('likes 10')).toBeVisible()
  })

  test('like button is clicked twice', async () => {
    const userEve = userEvent.setup()
    const likeHandler = vi.fn()

    render(<Blog blog={blog} user={userInfo} onLike={likeHandler} />)

    const viewButton = screen.getAllByText('view')[0]
    await userEve.click(viewButton)

    const likeButton = screen.getByText('like')
    await userEve.click(likeButton)
    await userEve.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})
