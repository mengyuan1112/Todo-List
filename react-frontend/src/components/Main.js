
import { Row, Col, Container,Button } from 'react-bootstrap';
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
