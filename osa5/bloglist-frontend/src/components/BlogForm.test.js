import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'A new title' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'A new author' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('A new title')
  expect(createBlog.mock.calls[0][0].author).toBe('A new author')
})