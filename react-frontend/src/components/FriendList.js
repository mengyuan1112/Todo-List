import React from 'react'
import { Container,Col,Row,Form} from 'react-bootstrap';
import hhh from '../1.png';
import Button from 'react-bootstrap/Button'

import {ListGroup} from 'react-bootstrap'

const FriendList =({friend,deleteFriend}) => {

    return (
        <ListGroup>
            <ListGroup.Item>
                <Row>
                <Col  xs="1">
                <img className="friendsPhoto" src={friend.friendPhoto} alt="User avatar" />
                </Col>
                <Col xs="9">
                <p class="title" >{friend.friendName}</p>
                {friend.friendStatus
                ?(<p class="title" style={{color:'black'}} >online</p>)
                :(<p class="title" style={{color:'gray'}} >offline</p>)
                }
                </Col>   
                <Col style={{ alignSelf: 'center' }}> <Button variant="outline-secondary" onClick={()=>deleteFriend(friend)}>delete</Button></Col>       
                </Row>
            </ListGroup.Item>
        </ListGroup>

    )


}

export default FriendList