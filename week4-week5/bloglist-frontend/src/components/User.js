import React from 'react'
import { Link } from 'react-router-dom'
import { Card, List, Header } from 'semantic-ui-react'

const User = ({ user }) => (
  <Card>
    <Card.Content>
      <Card.Header as='h2'>{user.name}</Card.Header>
      <Card.Description>
        <Header as='h3'>Added blogs</Header>
        <List>
          {user.blogs.map(blog => (
            <List.Item key={blog._id}><Link to={`/blogs/${blog._id}`}>{blog.title}</Link></List.Item>
          ))}
        </List>
      </Card.Description>
    </Card.Content>
  </Card>
)

export default User
