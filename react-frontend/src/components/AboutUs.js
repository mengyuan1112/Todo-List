import {Container,Row, Col,Image,Jumbotron} from 'react-bootstrap';
import img from './../chiklam.JPG'
import './AboutUs.css'
const AboutUs = () => {
    return (
        <>

        <br/>
        <br/>   
        <Container className="justify-content-center">
                <Row className="justify-content-center">
                <Col>
                    <br/>
                    <br/>
                        <p style={{fontSize:"2rem"}}>Chik Lam</p>
                        <p>Fontend Software developer</p>
                        <p><a href="https://github.com/lamchik1997">Github Link</a></p>
                </Col>
                <Col>
                    <Image src={img} rounded style={{width:'34%'}} />
                </Col>
                </Row>
        <hr/>
        <br/>
        <Row className="justify-content-center">
                <Col>
                    <br/>
                    <br/>
                        <p style={{fontSize:"2rem"}}>Name here </p>
                        <p>Role here</p>
                        <p><a href="XXX">Github Link</a></p>
                </Col>
                <Col>
                    <Image src="xxx" rounded style={{width:'34%'}} />
                </Col>
                </Row>

                <hr/>
        <br/>
        <Row className="justify-content-center">
                <Col>
                    <br/>
                    <br/>
                        <p style={{fontSize:"2rem"}}>Name here </p>
                        <p>Role here</p>
                        <p><a href="XXX">Github Link</a></p>
                </Col>
                <Col>
                    <Image src="xxx" rounded style={{width:'34%'}} />
                </Col>
                </Row>
        </Container>
        
        </>       
    )
}

export default AboutUs
