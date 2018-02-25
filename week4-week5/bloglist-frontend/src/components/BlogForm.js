import React, { Component } from 'react'

import { postNew } from '../services/blogs'
import notificationService from '../services/notification'

import './blog-form.css'

class BlogForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
    this.addBlog = this.addBlog.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
  }

  async addBlog(event) {
    event.preventDefault()
    await postNew({
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    }, this.props.user.token)
    this.props.updateBlogs()
    notificationService.setNotification(`Lisättiin blogi ${this.state.title}`, 'success')
    this.setState({ title: '', author: '', url: '' })
  }

  handleFormChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  render() {
    return (
      <form className='blog-form'>
        <h2>Create a new blog</h2>
        <input type="text" name="title" placeholder="title" value={this.state.title} onChange={this.handleFormChange}/>
        <input type="text" name="author" placeholder="author" value={this.state.author} onChange={this.handleFormChange}/>
        <input type="text" name="url" placeholder="url" value={this.state.url} onChange={this.handleFormChange}/>
        <button onClick={this.addBlog}>Add!</button>
      </form>
    )
  }
}

export default BlogForm
