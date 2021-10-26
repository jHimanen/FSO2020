import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    title: 'This is a test blog',
    author: 'Test Tester',
    url: 'http://www.test.com',
    user: 'Testie Tested'
}

const user = {
    name: 'Testie Tested'
}

const mockHandler = jest.fn()

test('renders content', () => {
  const component = render(
    <Blog blog={blog} user={user}/>
  )

  expect(component.container).toHaveTextContent(
    'This is a test blog'
  )
  expect(component.container).toHaveTextContent(
    'Test Tester'
  )
})

test('clicking the show button renders url and like amount', async () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('View')
  fireEvent.click(button)
    
  expect(component.container).toHaveTextContent(
    'http://www.test.com'
  )
  expect(component.container).toHaveTextContent(
    'Likes'
  )
})

test('clicking the like button twice increments likes by two', () => {
  const component = render(
    <Blog blog={blog} user={user} update={mockHandler}/>
  )

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('Like')
  for (let x in [1,2]) {
    fireEvent.click(likeButton)
  }

  expect(mockHandler.mock.calls).toHaveLength(2)
})