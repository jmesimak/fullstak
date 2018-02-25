import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  const likeHandler = jest.fn()
  const removeHandler = jest.fn()
  const getUserHandler = jest.fn()
  const blog = {
    title: 'Fuubaar',
    author: 'faafuu',
    likes: 10,
    user: {}
  }

  const getBlog = () => <Blog blog={blog} likeBlog={likeHandler} removeBlog={removeHandler} getUser={getUserHandler}/>

  it('renders title', () => {
    const simpleBlogComponent = shallow(getBlog())
    const blogDiv = simpleBlogComponent.find('.blog')
    expect(blogDiv.text()).toContain(blog.title)
  })

  it('does not render author when the entry has not been expanded', () => {
    const simpleBlogComponent = shallow(getBlog())
    const blogDiv = simpleBlogComponent.find('.blog')
    expect(blogDiv.text()).not.toContain(blog.author)
  })

  it('does render other info when the entry has been expanded', () => {
    const simpleBlogComponent = shallow(getBlog())
    const blogDivHeader = simpleBlogComponent.find('.blog h2')
    blogDivHeader.simulate('click')
    const blogDiv = simpleBlogComponent.find('.blog')
    expect(blogDiv.text()).toContain(blog.author)
    expect(blogDiv.text()).toContain(blog.likes)
  })

  // it('renders passed likes', () => {
  //   const simpleBlogComponent = shallow(<SimpleBlog blog={simpleBlog} onClick={handler} />)
  //   const likeArea = simpleBlogComponent.find('.like-area')
  //   expect(likeArea.text()).toContain(`10 likes`)
  // })

  // it('handles clicks', () => {
  //   const simpleBlogComponent = shallow(<SimpleBlog blog={simpleBlog} onClick={handler} />)
  //   const likeArea = simpleBlogComponent.find('.like-area')
  //   const likeButton = likeArea.find('button')
  //   likeButton.simulate('click')
  //   likeButton.simulate('click')

  //   expect(handler.mock.calls.length).toBe(2)
  // })
})
