import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import Login from './components/Login'
jest.mock('./services/blogs')
import blogsService from './services/blogs'

describe('<App />', () => {
  let app

  describe('without user', () => {
    beforeAll(() => {
      app = mount(<App />)
    })
    it('only renders the login form in the beginning', () => {
      app.update()
      const loginComponent = app.find(Login)
      const blogComponent = app.find(Blog)
      expect(loginComponent.exists()).toBeTruthy()
      expect(blogComponent.exists()).toBeFalsy()
    })
  })

  describe('with user', () => {
    beforeAll(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      window.localStorage.setItem('currentUser', JSON.stringify(user))
      app = mount(<App />)
    })
    it('renders blogs, hides login', () => {
      app.update()
      const loginComponent = app.find(Login)
      const blogComponent = app.find(Blog)
      expect(loginComponent.exists()).toBeFalsy()
      expect(blogComponent.exists()).toBeTruthy()
    })
  })
})