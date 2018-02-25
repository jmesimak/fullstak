import React from 'react'
import PropTypes from 'prop-types'
import './notification.css'

const Notification = ({ message, type }) => {

  return (
    <div className='notification'>
      <p className={type}>{message}</p>
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default Notification
