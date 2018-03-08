import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Header, Menu, Table } from 'semantic-ui-react'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import Users from './components/Users'
import User from './components/User'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { createNotification, clearNotification } from './reducers/notification'
import { initUsers } from './reducers/users'
import { initBlogs } from './reducers/blogs'
import { initUser, logOutUser } from './reducers/user'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.setUser = this.setUser.bind(this)
  }

  async componentDidMount() {
    this.props.initUsers()
    this.props.initBlogs()
    this.props.initUser()
  }

  removeBlog = async (blog) => {
    try {
      await blogsService.remove(blog, this.props.user.token)
    } catch (e) {
      this.props.createNotification('Could not delete blog, does it belong to you?', 'error')
      setTimeout(this.props.clearNotification, 5000)
    }
  }

  setUser = (user) => {
    this.setState({ user })
  }

  render() {
    const blogs = () => (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Blog</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>likes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.blogs.sort((a,b) => a.likes < b.likes ? 1 : -1).map(blog =>
            <Table.Row key={blog.id}>
              <Table.Cell>
                <Link key={blog.id}to={`/blogs/${blog.id}`} >
                  <h3>{blog.title}</h3>
                </Link>
              </Table.Cell>
              <Table.Cell>{blog.author}</Table.Cell>
              <Table.Cell>{blog.likes}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    )

    const loggedInUser = () => (
      <div>
        <p>{this.props.user.username} logged in</p>
        <button onClick={this.props.logOutUser}>Logout</button>
      </div>
    )

    const blogForm = () => (
      <Togglable name="blog form" ref={component => this.blogFormToggler = component}>
        <BlogForm user={this.props.user} />
      </Togglable>
    )

    return (
      <div>
        <Router>
          <Container>
            <div style={{ marginTop: '1em' }}>
              <Menu>
                <Menu.Item><Header as='h1' color='olive'>blog.keeper</Header></Menu.Item>
                <Menu.Item name='blogs'><Link to="/">blogs</Link></Menu.Item>
                <Menu.Item name='users'><Link to="/users">users</Link></Menu.Item>
                <Menu.Item position='right'>{ this.props.user.loggedIn && loggedInUser() }</Menu.Item>
              </Menu>
              { this.props.notification.message && <Notification message={this.props.notification.message} type={this.props.notification.notifType} /> }
              <Route exact path="/" render={() => (
                <div>
                  { this.props.user.loggedIn && blogForm() }
                  { this.props.user.loggedIn ? blogs() : <Login setUser={this.setUser} />}
                </div>
              )} />
              <Route exact path="/users" render={() => (
                <Users users={this.props.users} />
              )} />
              <Route path="/users/:id" render={({ match }) => (
                <User user={this.props.users.find(u => u.id === match.params.id) || { blogs: [] }} />
              )} />
              <Route path="/blogs/:id" render={({ match }) => (
                <Blog blog={this.props.blogs.find(b => b.id === match.params.id) || {}} token={this.props.user.token} removeBlog={this.removeBlog} />
              )} />
            </div>
          </Container>
        </Router>
      </div>
    )
  }
}

const mapDispatchToProps = {
  createNotification,
  clearNotification,
  initUsers,
  initBlogs,
  initUser,
  logOutUser
}

const mapStateToProps = state => {
  return ({
    notification: state.notification,
    users: state.users,
    blogs: state.blogs,
    user: state.user,
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
