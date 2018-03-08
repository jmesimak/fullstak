import React from 'react'
import PropTypes from 'prop-types'
import { Card, Header } from 'semantic-ui-react'
import './notification.css'

const Notification = ({ message, type }) => {

  return (
    <Card className='notification'>
      <Card.Content>
        <Card.Header><Header color={type === 'success' ? 'green' : 'red'}>{message}</Header></Card.Header>
      </Card.Content>
    </Card>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default Notification
