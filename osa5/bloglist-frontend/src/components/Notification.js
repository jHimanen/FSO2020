import React from 'react'

const Notification = ({ type, message }) => {

    const successStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    const errorStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    if (type === 'success') {
      return (
        <div style={successStyle} >
          {message}
        </div>
      )

    } else if (type === 'error') {
      return (
        <div style={errorStyle}>
          {message}
        </div>
      )
    } else return null;
  }

  export default Notification