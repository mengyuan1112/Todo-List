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
                    <Image src={img} rounded style={{width:'60%', height: '100%'}} />
                </Col>
                <Col>
                    <Image src={yuanImg} className="yuan_img" rounded style={{width:'60%', height: '100%'}} />
                </Col>
                <Col>
                    <Image src="xxx" rounded style={{width:'60%', height: '100%'}} />
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
                        <p style={{fontSize:"2rem"}}>Name here </p>
                        <p>Role here</p>
                        <p><a href="XXX">Github Link</a></p>
                        <p>Email: ...</p>
                </Col>
            </Row>
        </Container>
        
        </>       
    )
}

export default AboutUs
