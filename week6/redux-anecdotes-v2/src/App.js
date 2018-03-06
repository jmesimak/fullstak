import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { anecdoteInitAction } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'

class App extends React.Component {

  componentDidMount() {
    this.props.anecdoteInitAction()
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  anecdoteInitAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
