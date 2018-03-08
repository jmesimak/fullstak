import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Header, Button, Card } from 'semantic-ui-react'

import { createNotification, clearNotification } from '../reducers/notification'
import { logInUser } from '../reducers/user'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.handleLoginFieldChange = this.handleLoginFieldChange.bind(this)
    this.login = this.login.bind(this)
  }

  async login(event) {
    event.preventDefault()
    try {
      await this.props.logInUser(this.state.username, this.state.password)
      this.setState({ username: '', password: '' })
      this.props.createNotification('Logged in', 'success')
      setTimeout(this.props.clearNotification, 5000)
    } catch(exception) {
      this.props.createNotification('Failed to log in', 'error')
      setTimeout(this.props.clearNotification, 5000)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Description>
            <Header as='h2'>Login</Header>
            <Form onSubmit={this.login}>
              <Form.Field>
                <label>username</label>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleLoginFieldChange}
                />
              </Form.Field>
              <Form.Field>
                <label>password</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleLoginFieldChange}
                />
              </Form.Field>
              <Button type="submit">Submit</Button>
            </Form>
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  createNotification, clearNotification, logInUser
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
