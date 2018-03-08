import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  const handler = jest.fn()
  const simpleBlog = {
    title: 'Fuubaar',
    author: 'faafuu',
    likes: 10,
  }

  it('renders header', () => {
    const simpleBlogComponent = shallow(<SimpleBlog blog={simpleBlog} onClick={handler} />)
    const header = simpleBlogComponent.find('.header')
    expect(header.text()).toContain(`${simpleBlog.title} ${simpleBlog.author}`)
  })

  it('renders passed likes', () => {
    const simpleBlogComponent = shallow(<SimpleBlog blog={simpleBlog} onClick={handler} />)
    const likeArea = simpleBlogComponent.find('.like-area')
    expect(likeArea.text()).toContain('10 likes')
  })

  it('handles clicks', () => {
    const simpleBlogComponent = shallow(<SimpleBlog blog={simpleBlog} onClick={handler} />)
    const likeArea = simpleBlogComponent.find('.like-area')
    const likeButton = likeArea.find('button')
    likeButton.simulate('click')
    likeButton.simulate('click')

    expect(handler.mock.calls.length).toBe(2)
  })
})
