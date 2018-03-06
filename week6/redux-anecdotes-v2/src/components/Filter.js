import React from 'react'
import { connect } from 'react-redux'
import { filterUpdateAction } from '../reducers/filterReducer'
import { anecdoteFilterAction } from '../reducers/anecdoteReducer'

class Filter extends React.Component {
  handleChange = event => {
    this.props.filterUpdateAction(event.target.value)
    this.props.anecdoteFilterAction(event.target.value)
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange} value={this.props.filter.keyword}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filter: state.filter
})

const mapDispatchToProps = {
  filterUpdateAction,
  anecdoteFilterAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
