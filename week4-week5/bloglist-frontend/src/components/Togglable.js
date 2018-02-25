import React, { Component } from 'react'

class Togglable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: false,
      displayStatus: 'Show'
    }
    this.flipVisibility = this.flipVisibility.bind(this)
  }

  flipVisibility(show) {
    const displayStatus = this.state.toggled ? 'Show' : 'Hide'
    this.setState({ toggled: !this.state.toggled, displayStatus })
  }

  hide() {
    this.setState({ toggled: false, displayStatus: 'Show' })
  }

  render() {
    return (
      <div>
        <div>
          { this.state.toggled && this.props.children }  
        </div>
        <button onClick={this.flipVisibility}>{this.state.displayStatus} {this.props.name}</button>
      </div>
    )
  }
}

export default Togglable
