import React, { Component } from 'react'
import PropTypes from 'prop-types'

import loginService from '../services/login'
import notificationService from '../services/notification'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleLoginFieldChange = this.handleLoginFieldChange.bind(this)
  }

  static propTypes = {
    setUser: PropTypes.func.isRequired,
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const loginResponse = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      const user = {
        token: loginResponse.token,
        username: this.state.username,
      }
      window.localStorage.setItem('currentUser', JSON.stringify(user))
      this.setState({ username: '', password: ' '})
      this.props.setUser(user)
      notificationService.setNotification('Kirjauduttiin onnistuneesti', 'success')
    } catch(exception) {
      notificationService.setNotification('Kirjautuminen epäonnistui, tarkasta käyttäjätunnus ja salasana', 'error')
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className="login-form">
        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }
}

export default Login
