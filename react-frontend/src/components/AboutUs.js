import {Container,Row, Col,Image,Jumbotron} from 'react-bootstrap';
import img from './../chiklam.JPG'
import yuanImg from './../Yuan Meng.png'
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
                        <p>Frontend Software developer</p>
                        <p><a href="https://github.com/lamchik1997">Github Link</a></p>
                        <p>Contact Email: ...</p>
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
                        <p style={{fontSize:"2rem"}}>Yuan Meng</p>
                        <p>Backend Developer</p>
                        <p><a href="https://github.com/mengyuan1112">Github Link</a></p>
                        <p>Contact Email: yuanmeng@buffalo.edu</p>
                </Col>
                <Col>
                    <Image src={yuanImg} rounded style={{width:'34%'}} />
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
                        <p>Contact Email: ...</p>
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
