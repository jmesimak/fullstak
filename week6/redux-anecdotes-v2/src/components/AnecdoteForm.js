import React from 'react'
import { connect } from 'react-redux'

import { anecdoteCreationAction } from '../reducers/anecdoteReducer'
import { handleNewAnecdoteChange } from '../reducers/anecdoteFormReducer'
import { notifCreationAction, notifClearAction } from '../reducers/notifReducer'
import { dispatchWithNoficiation } from '../reducers/helper'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    dispatchWithNoficiation(
      this.props.notifCreationAction,
      this.props.notifClearAction,
      'Anecdote added'
    )
    this.props.anecdoteCreationAction(this.props.newAnecdoteContent)
    this.props.handleNewAnecdoteChange('')
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              onChange={(e) => this.props.handleNewAnecdoteChange(e.target.value)}
              value={this.props.newAnecdoteContent}
            />
          </div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  newAnecdoteContent: state.newAnecdoteContent
})

const mapDispatchToProps = {
  anecdoteCreationAction,
  notifCreationAction,
  notifClearAction,
  handleNewAnecdoteChange,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
