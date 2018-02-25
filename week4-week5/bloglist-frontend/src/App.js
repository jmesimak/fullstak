import React from 'react'
import uuid from 'uuid'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import notificationService from './services/notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
    }
    this.getUser = this.getUser.bind(this)
    this.logout = this.logout.bind(this)
    this.setUser = this.setUser.bind(this)
    this.likeBlog = this.likeBlog.bind(this)
    this.updateBlogs = this.updateBlogs.bind(this)
    this.setNotification = this.setNotification.bind(this)
  }

  componentDidMount() {
    notificationService.setNotificationSetter(this.setNotification)

    this.updateBlogs()
    const jsonUser = window.localStorage.getItem('currentUser')
    if (jsonUser) {
      const user = JSON.parse(jsonUser)
      this.setUser(user)
    }
  }

  async updateBlogs() {
    const blogs = await blogsService.getAll()
    this.setState({ blogs })
    if (this.blogFormToggler) this.blogFormToggler.hide()
  }

  logout = async (event) => {
    window.localStorage.removeItem('currentUser')
    this.setState({ user: undefined })
  }

  likeBlog = async (blog) => {
    await blogsService.like(blog, this.state.user.token)
    this.updateBlogs()
  }

  removeBlog = async (blog) => {
    try {
      await blogsService.remove(blog, this.state.user.token)
      this.updateBlogs()
    } catch (e) {
      this.setNotification('Could not delete blog, does it belong to you?', 'error')
    }
  }
  
  setUser = (user) => {
    this.setState({ user })
  }

  getUser = () => {
    return this.state.user
  }

  setNotification = (message, type) => {
    const id = uuid.v4()
    this.setState({ notification: { message, type, id } })
    setTimeout(() => {
      if (id === this.state.notification.id) this.setState({ notification: undefined })
    }, 7000) 
  }

  render() {
    const blogs = () => (
      <div>
      <h2>blogs</h2>
        {this.state.blogs.sort((a,b) => a.likes < b.likes ? 1 : -1).map(blog => 
          <Blog key={blog.id} blog={blog} likeBlog={this.likeBlog} removeBlog={this.removeBlog} getUser={this.getUser} />
        )}
      </div>
    )

    const loggedInUser = () => (
      <div>
        <p>{this.state.user.username} logged in</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    )

    const blogForm = () => (
      <Togglable name="blog form" ref={component => this.blogFormToggler = component}>
        <BlogForm updateBlogs={this.updateBlogs} user={this.state.user} />
      </Togglable>
    )
    

    return (
      <div>
        { this.state.notification && <Notification message={this.state.notification.message} type={this.state.notification.type} /> }
        { this.state.user && loggedInUser() }
        { this.state.user ? blogs() : <Login setUser={this.setUser} />}
        { this.state.user && blogForm() }
      </div>
    );
  }
}

export default App;
