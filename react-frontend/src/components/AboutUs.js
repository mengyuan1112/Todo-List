import {Container,Row, Col,Image,Jumbotron} from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import img from './../chiklam.JPG'
import yuanImg from './../Yuan Meng.png'
import Qinran from '../Qinran.jpg';
import './AboutUs.css'

const AboutUs = () => {
    return (
        <>

        <br/>
        <br/>   

        <Container>
                {/* <Row className="justify-content-center">
                <Col>
                    <Image src={img} rounded style={{width:'60%', height: '100%'}} />
                </Col>
                <Col>
                    <Image src={yuanImg} className="yuan_img" rounded style={{width:'60%', height: '100%'}} />
                </Col>
                <Col>
                    <Image src={hhh} rounded style={{width:'60%', height: '100%'}} />
                </Col>

                </Row>
                <Row className="justify-content-center">
                <Col>
                    <br/>
                    <br/>
                        <p style={{fontSize:"2rem"}}>Chik Lam</p>
                        <p>Frontend Software developer</p>
                        <p><a href="https://github.com/lamchik1997">Github Link</a></p>
                        <p>Email: chiklam@buffalo.edu</p>
                </Col>
                <hr/>
                 <br/>
                <Col>
                    <br/>
                    <br/>
                        <p style={{fontSize:"2rem"}}>Yuan Meng</p>
                        <p>Backend Developer</p>
                        <p><a href="https://github.com/mengyuan1112">Github Link</a></p>
                        <p>Email: yuanmeng@buffalo.edu</p>
                </Col>

                <hr/>
                <br/>
                <Col>
                    <br/>
                    <br/>
                        <p style={{fontSize:"2rem"}}>Qinran Wang </p>
                        <p>Frontend developer</p>
                        <p><a href="https://github.com/qinran222">Github Link</a></p>
                        <p>Email: qinranwa@buffalo.edu, qinran6271@gmail.com</p>
                </Col>
            </Row> */}
   
            
            <Row>
            <Col   style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card style={{ width: '18rem'  }} className="abuCard">
                <Card.Img variant="top" src={img} className="abuPhoto" />
                <Card.Body>
                <Card.Title>Chik Lam</Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item>Frontend Software Developer</ListGroup.Item>
                    <ListGroup.Item><a href="https://github.com/lamchik1997">Github Link</a></ListGroup.Item>
                    <ListGroup.Item>Email: chiklam@buffalo.edu</ListGroup.Item>
                </ListGroup>
                </Card.Body>
            </Card> 
            </Col>
           
            <Col  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card style={{ width: '18rem' }} className="abuCard">
                <Card.Img  src={yuanImg} className="abuPhoto" />
                <Card.Body>
                <Card.Title>Yuan Meng</Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item>Backend Developer</ListGroup.Item>
                    <ListGroup.Item><a href="https://github.com/mengyuan1112">Github Link</a></ListGroup.Item>
                    <ListGroup.Item>Email: yuanmeng@buffalo.edu</ListGroup.Item>
                </ListGroup>
                </Card.Body>
            </Card> 
            </Col>

            <Col  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card style={{ width: '18rem'}} className="abuCard">
                <Card.Img variant="top" src={Qinran} className="abuPhoto"/>
                <Card.Body>
                <Card.Title>Qinran Wang</Card.Title>      
                <ListGroup variant="flush">
                    <ListGroup.Item>Frontend Developer</ListGroup.Item>
                    <ListGroup.Item><a href="https://github.com/qinran222">Github Link</a></ListGroup.Item>
                    <ListGroup.Item>Email: qinranwa@buffalo.edu</ListGroup.Item>
                </ListGroup>
                </Card.Body>
            </Card> 
            </Col>
            </Row>

    
        </Container>
        
        </>       
    )
}

export default AboutUs
