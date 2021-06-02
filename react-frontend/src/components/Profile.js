import { Container,Col,Row,Form} from 'react-bootstrap';
import React ,{useState,useRef,Component,useEffect} from "react"
import {ListGroup,Card} from 'react-bootstrap'

import hhh from '../1.png';
import "./Profile.css";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Changepassword from './Changepassword'
import { Switch, Route, Link } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert'





const Profile = ({name,nickName,onNameChange}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);


    const [nicknamealert, Setnicknamealert] = useState(false);
    const [passwordalert, Setpasswordalert] = useState(false);



    const [emailPro,Getemail] = useState('');
    const [usernamePro,Getusername] = useState('');
    const [passwordPro, Getpassword] = useState('');
    //const [imagegPro, Getimage] = useState({});

    function kkk(){
        setShow1(false);    
    }
  

    useEffect(() => {
      axios.get(`/${name}/profile`).then(
        res => {

            console.log("The url is /name/profile",res)

            Getemail(res.data.email)
            Getusername(res.data.username)
            Getpassword(res.data.password)
            
            
            //SetAvater(res.data.avater)
        },
       err => {
          console.log(err);
          Getemail('');
          Getusername('')
          Getpassword('')
          
         
        }

    
      )},[])
      useEffect(() => {
        axios.get(`/${name}/profile`,{responseType: 'arraybuffer'}).then(
          res => {
            Buffer.from(res.data, 'binary').toString('base64')
              //SetAvater(res.data.avater)
          },
         err => {
            
          }
  
      
        )},[])

      
    const [newpasswordPro,Setnewpassword] = useState('');
    const [newpasswordErr,SetnewpasswordErr] = useState('');
    const [newnickname, Setnewname] = useState(nickName);
    const [newnameError, SetnewnameErr]=  useState('');
    const [confirmPasswordPro,setConfirmPasswordPro] = useState('');
    const [image,uploadedImage] = useState([]);

    //const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
          const reader = new FileReader();
          image.file = file;
          reader.onload = e => {
            image.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      };

    const submitAvater =(e)=>{
        e.preventDefault();
        axios.post( `http://localhost:5000/${name}/profile/icon`,{icon:image}).then(
            (response)=>{
                console.log(response);
                if (response.data.result === "Pass"){
                    setShow(false);Setnicknamealert(true)
                }
            })
            //.catch(err=>{ console.log(err) });
            
            console.log(image);
    }

    const submitNickname= (e) =>{
    e.preventDefault();
    console.log("hhhhh")
    axios.post(`http://localhost:5000/${name}/profile/nickname`,{newName:newnickname }).then(

    (response)=>{
        console.log(response);
        if (response.data.result === "Pass"){
            setShow(false);Setnicknamealert(true)
        }
 
    })
    .catch(err=>{ console.log(err) });
    }

    const submitPassword= (e) =>{
        e.preventDefault();
        axios.post(`http://localhost:5000/${name}/profile/password`,{newPassword:newpasswordPro,oldPassword:passwordPro}).then(
        (response)=>{
            console.log(response);
            if (response.data.result === "Pass"){
                setShow1(false);Setpasswordalert(true)
               
            }
    
            else if (response.data.result === "The password is not satisfied categories"){
                SetnewpasswordErr(response.data.result)
                
            }
    
            else if (response.data.result === "Password is wrong"){
                SetnewpasswordErr("Old password is wrong")
                console.log(newpasswordErr)
                setShow1(true)
    
            }
    
        })
        .catch(err=>{ console.log(err) });
        }


    const checkPassword=(e)=>{
        setConfirmPasswordPro(e.target.value);
        if (newpasswordPro !== e.target.value ){
            SetnewpasswordErr("Password did't match")
        }
        else{
            SetnewpasswordErr('');
        }
    }


    const checkNicname=(e)=>{
        Setnewname(e.target.value)
        if (e.target.value== ""){
            SetnewnameErr("Nickname cannot be empty")
        }
        else{
            SetnewnameErr('');
        }
    }

    
    
    setTimeout(() => {
        Setnicknamealert(false);Setpasswordalert(false)
      }, 2000)


    return(
        <div>
       

        {/*!timeOut &&*/<Alert show={nicknamealert} variant="success" /*onClose={() => setShow2(false)} dismissible*/>

        <p>
            Congratulations! Your nickname was successfully changed.
        </p>
        </Alert>}


        {/*!timeOut &&*/<Alert show={passwordalert} variant="success" /*onClose={() => setShow2(false)} dismissible*/>
        <p>
            Congratulations! Your password was successfully changed.
        </p>
        </Alert>}
        

        <br></br>
        <br></br>
        <Container>
        <Row className="justify-content-md-center">
            <Col xs={8}>
            <Card>
            <Card.Header><h4 >Profile</h4></Card.Header>
            <ListGroup>
           
                {/*<ListGroup.Item action onClick={handleShow2}>
                    <Row>
                    <Col xs="5"><h5>Avatar</h5></Col>
                    <Col>
                    <img className="Avatar" src={image.src} alt="User avatar"/>
                    </Col>
                    </Row>
                </ListGroup.Item>*/}
            
                <ListGroup.Item>
                    <Row>
                        <Col xs="5"><h5>Username</h5></Col> <Col>{usernamePro}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item action onClick={handleShow} >
                    <Row>
                    <Col xs="5"><h5>Nickname</h5></Col> <Col>{newnickname}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item >
                    <Row>
                    <Col xs="5"><h5>Email</h5></Col> <Col>{emailPro}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item action onClick={handleShow1}>
                    <Row>
                    <Col xs="5"><h5>Password</h5> </Col> <Col>**********</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item action onClick={handleShow2}>
                    <Row>
                    <Col xs="5"><h5>Avatar</h5></Col>
                    <Col>
                    <img className="Avatar" src={image} alt="User avatar"/>
                    {/*<Form.File id="exampleFormControlFile1" />*/}  
                    </Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>  
            </Card>
            </Col>
            </Row>
        </Container>

        <Switch>
            <Route path="/changepassword" component={<Changepassword/>} />
        </Switch>



        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Nickname Change</Modal.Title>
        </Modal.Header>

            <Form onSubmit={submitNickname}>
            <Modal.Body>
                {newnameError
                ?(<Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="nickname" onChange={(e)=>checkNicname(e)} placeholder="Enter nickname"  />

                    <Form.Text className="text-muted">
                    Please enter your new nickname.
                    </Form.Text>
                    <Form.Text style={{ color:"red" }}>{newnameError}</Form.Text> 
                </Form.Group>)  

                :(<Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="nickname" onChange={(e)=>checkNicname(e)} placeholder="Enter nickname"  />
                <Form.Text className="text-muted">
                Please enter your new nickname.
                </Form.Text>
                </Form.Group>)
                }     

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>

            {newnameError
            ?(<Button variant="primary" type="submit" >Save Changes</Button>)
            :(<Button variant="primary" type="submit" /*onClick={()=>{setShow(false);Setnicknamealert(true)}}*/>Save Changes</Button>)
            }

        </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Password change</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitPassword}>
        <Modal.Body>

            <Form.Group className="mb-3" controlId="formBasicPassword" >               

                <Form.Control type="password" onChange={(e)=>Getpassword(e.target.value)} placeholder="Old Password" />
                <Form.Text className="text-muted">
                  Please enter your old password
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                
                <Form.Control type="password" onChange={(e)=>Setnewpassword(e.target.value)} placeholder="New Password" />
                <Form.Text className="text-muted">
                Your password must be 8-20 characters long, contain uppercase letters, lowercase letters, numbers, and at least one spercial character.
                Your password must not contain spaces, or emoji.
                </Form.Text>
            </Form.Group>
            {newpasswordErr
            ?(<Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Confirm Password" onChange={(e)=>checkPassword(e)} />
                <Form.Text style={{ color:"red" }}>
                {newpasswordErr}
                </Form.Text>
            </Form.Group>)
            :(<Form.Group className="mb-3" controlId="formBasicPassword">
                
                <Form.Control type="password" placeholder="Confirm Password" onChange={(e)=>checkPassword(e)}/>
            </Form.Group>)
            }   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          {newpasswordErr
          ?(<Button variant="primary" type="submit" >Submit</Button>)
          :(<Button variant="primary" type="submit" /*onClick={()=>{setShow1(false);Setpasswordalert(true)}}*/>Submit</Button>)}

        </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <form onSubmit={submitAvater}>
        <Modal.Body>
            
       <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none"
        }}
      />
      <div
        style={{
          height: "100px",
          width: "100px",
          border: "1px dashed black"
        }}
        onClick={() => imageUploader.current.click()}
      >
        <img
        ref={uploadedImage}
          className="Avatar2" style={{
            width: "100%",
            height: "100%",
            position: "acsolute"
          }}
          //ref={uploadedImage}
        />
      </div>
      Click to upload Image
        </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="submit" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose2}>
            Save Changes
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
        </div>
        


    )
}

export default Profile
