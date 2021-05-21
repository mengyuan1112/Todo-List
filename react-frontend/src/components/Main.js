
import React from 'react'
import Logout from './Logout'
const Main = ({username}) => {
    return (
      <>
      <h1>Hi {username}</h1>
      <Logout/>
      </>
    )
}

export default Main
