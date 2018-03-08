import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Form, Button } from 'semantic-ui-react'
import { createNotification, clearNotification } from '../reducers/notification'
import { postBlog } from '../reducers/blogs'
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
    this.props.postBlog({
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    }, this.props.user.token)
    this.props.createNotification(`Added blog ${this.state.title}`, 'success')
    setTimeout(this.props.clearNotification, 5000)
    this.setState({ title: '', author: '', url: '' })
  }

  handleFormChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <Card style={{ marginBottom: '1em', paddingTop: '1em', paddingBottom: '1em' }}>
        <Card.Content>
          <Card.Header><h2>Create a new blog</h2></Card.Header>
          <Card.Description>
            <Form className='blog-form'>
              <Form.Field>
                <input type="text" name="title" placeholder="title" value={this.state.title} onChange={this.handleFormChange}/>
              </Form.Field>
              <Form.Field>
                <input type="text" name="author" placeholder="author" value={this.state.author} onChange={this.handleFormChange}/>
              </Form.Field>
              <Form.Field>
                <input type="text" name="url" placeholder="url" value={this.state.url} onChange={this.handleFormChange}/>
              </Form.Field>
              <Button type='submit' onClick={this.addBlog}>Add!</Button>
            </Form>
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

const mapDispatchToProps = {
  createNotification,
  clearNotification,
  postBlog,
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)
