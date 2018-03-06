import React from 'react'
import { connect } from 'react-redux'
import { dispatchWithNoficiation } from '../reducers/helper'
import { anecdoteLikeAction } from '../reducers/anecdoteReducer'
import { notifClearAction, notifCreationAction } from '../reducers/notifReducer'
import Filter from '../components/Filter'


const AnecdoteList = props => {
  const like = (anecdote) => async () => {
    dispatchWithNoficiation(
      props.notifCreationAction,
      props.notifClearAction,
      `Liked ${anecdote.content}`
    )
    props.anecdoteLikeAction(anecdote)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={like(anecdote)}>
              vote
            </button>
          </div>
        </div>
      )}
      <Filter />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
      .filter(({ content }) => content.includes(state.filter.keyword))
      .sort((a, b) => b.votes - a.votes),
  }
}

const mapDispatchToProps = { anecdoteLikeAction, notifCreationAction, notifClearAction }

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
