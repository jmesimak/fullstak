import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import { Card, Form, Button, List } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogs'

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = { comment: '' }
    this.remove = this.remove.bind(this)
    this.addComment = this.addComment.bind(this)
    this.updateComment = this.updateComment.bind(this)
  }

  static propTypes = {
    likeBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
  }

  remove() {
    this.props.removeBlog(this.props.blog)
  }

  updateComment(e) {
    this.setState({ comment: e.target.value })
  }

  addComment(e) {
    e.preventDefault()
    this.props.commentBlog(this.props.blog, this.state.comment)
    this.setState({ comment: '' })
  }

  render() {
    const username = this.props.user ? this.props.user.username : ''
    const { blog } = this.props
    const user = blog.user || {}

    const commentField = (
      <Form>
        <Form.TextArea type="text" value={this.state.comment} onChange={this.updateComment}>
        </Form.TextArea>
        <Button onClick={this.addComment}>add comment</Button>
      </Form>
    )

    return (
      <Card className="blog">
        <Card.Content>
          <Card.Header><a href={blog.url}>{blog.title}</a></Card.Header>
          <Card.Meta>Author: {blog.author} | {blog.likes} likes | Added by: {user.username}</Card.Meta>
          <Card.Description>
            { (username === user.username || !blog.user) && <Button onClick={this.remove}>Delete blog</Button> }
            <Button onClick={() => this.props.likeBlog(blog, this.props.token)}>Like!</Button>
            <List>
              <h3>Comments</h3>
              {blog.comments && blog.comments.map(comment => (
                <List.Item key={uuid.v4()}>{comment}</List.Item>
              ))}
            </List>
            {commentField}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})
const mapDispatchToProps = {
  likeBlog,
  commentBlog,
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
