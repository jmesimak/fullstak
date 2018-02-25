import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: false
    }
    this.toggle = this.toggle.bind(this)
    this.remove = this.remove.bind(this)
    this.like = this.like.bind(this)
  }

  static propTypes = {
    likeBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired
  }

  toggle() {
    this.setState({ toggled: !this.state.toggled })
  }

  like() {
    this.props.likeBlog(this.props.blog)
  }

  remove() {
    this.props.removeBlog(this.props.blog)
  }

  render() {
    const username = this.props.getUser() ? this.props.getUser().username : ''
    const { blog } = this.props
    const user = blog.user || {}
    const fullInfo = () => (
      <div style={{marginLeft: '1em'}}>
        <p>Author: {blog.author}</p>
        <p>{blog.likes} likes <button onClick={this.like}>Like!</button></p>
        <a href={blog.url}>{blog.url}</a>
        <p>Added by: {user.username}</p>
        { (username === user.username || !blog.user) && <button onClick={this.remove}>Delete blog</button> }
      </div>
    )
    return (
      <div className="blog">
        <h2 onClick={this.toggle} style={{cursor: 'pointer', fontWeight: 'inherit'}}>{blog.title}</h2>
        { this.state.toggled && fullInfo() }
      </div>  
    )
  }
}

export default Blog