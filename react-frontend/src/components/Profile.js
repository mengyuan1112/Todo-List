import { Container,Col,Row,Form} from 'react-bootstrap';
import React ,{useState,useRef,Component,useEffect} from "react"
import {ListGroup,Card} from 'react-bootstrap'

import hhh from '../1.png';
import "./Profile.css";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Changepassword from './Changepassword'
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { AiOutlineEdit } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";

import Alert from 'react-bootstrap/Alert'





const Profile = ({name,onNameChange,changeImage}) => {
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
    const [iconalert, Seticonalert] = useState(false);
    const [iconalertInside, SeticonalertInside] = useState(true);
    const alertInsideShow=() => SeticonalertInside(true)
    const alertInsideClose=() => SeticonalertInside(false)




    const [emailPro,Getemail] = useState('');
    const [usernamePro,Getusername] = useState('');
    const [passwordPro, Getpassword] = useState('');
    const [imagePro, Getimage] = useState('');
    const [newnickname, Setnewname] = useState('');
    


    const submitAvater =(e)=>{
      e.preventDefault();
      Getimage(image.src)
      axios.post( `http://localhost:5000/${name}/profile/icon`,{icon:image.src}).then(
          (response)=>{
              if (response.data.result === "Pass"){
                  setShow2(false);Seticonalert(true)
              }
          })
      //axios.get(`${name}/profile/icon`)
          //.catch(err=>{ console.log(err) });
          changeImage(image.src)
  }


    useEffect(() => {
      axios.get(`/${name}/profile`).then(
        res => {


            Getemail(res.data.email)
            Getusername(res.data.username)
            Getpassword(res.data.password)
            Setnewname(res.data.name)
            Getimage(res.data.icon)
            
            
            //SetAvater(res.data.avater)
        },
       err => {
          console.log(err);
          Getemail('');
          Getusername('')
          Getpassword('')
          Setnewname('')
          Getimage('')
          
         
        }

    
      )},[submitAvater])

      
    const [newpasswordPro,Setnewpassword] = useState('');
    const [newpasswordErr,SetnewpasswordErr] = useState('');
   
    const [newnameError, SetnewnameErr]=  useState('');
    const [confirmPasswordPro,setConfirmPasswordPro] = useState('');
    const [image,uploadedImage] = useState([]);
    const history = useHistory();
    const [error,setError] = useState(false)
    //const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
          const reader = new FileReader();
          image.file = file;
          if (image.file.size>2000000){
            setError(true);
          }
          else{
            setError(false)
          }
          console.log(image.file)
          reader.onload = e => {
            image.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      };
    
    

 
    const submitNickname= (e) =>{
    e.preventDefault();
    console.log("hhhhh")
    axios.post(`http://localhost:5000/${name}/profile/nickname`,{newName:newnickname }).then(

    (response)=>{
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
        Setnicknamealert(false);Setpasswordalert(false);Seticonalert(false)
      }, 2000)


    return(
        <div>
       

        {/*!timeOut &&*/<Alert show={nicknamealert} variant="success" /*onClose={() => setShow2(false)} dismissible*/>

        <p>
          <BiCheckCircle/>Congratulations! Your nickname was successfully changed.
        </p>
        </Alert>}


        {/*!timeOut &&*/<Alert show={passwordalert} variant="success" /*onClose={() => setShow2(false)} dismissible*/>
        <p>
          <BiCheckCircle/>Congratulations! Your password was successfully changed.
        </p>
        </Alert>}

        {/*!timeOut &&*/<Alert show={iconalert} variant="success" /*onClose={() => setShow2(false)} dismissible*/>
        <p>
          <BiCheckCircle/>Congratulations! Your Avater was successfully changed.
        </p>
        </Alert>}

        <br></br>
        <br></br>
        <Container>
        <Row className="justify-content-md-center">
            <Col xs={8}>
            <Card>
            <Card.Header><h3>Profile</h3></Card.Header>
            <ListGroup>
           
                <ListGroup.Item action onClick={handleShow2}>
                    <Row>
                    <Col xs="4"><h4>Avatar</h4></Col> 
                    <Col xs="7">
                    <img className="Avatar" src={imagePro} alt="User avatar"/>   
                    {/*<Form.File id="exampleFormControlFile1" />*/}  
                    </Col>
                    <Col><AiOutlineEdit/></Col>
                    </Row>
                </ListGroup.Item>
            
                <ListGroup.Item>
                    <Row>
                        <Col xs="4"><h4>Username</h4></Col> <Col>{usernamePro}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item action onClick={handleShow} >
                    <Row>
                    <Col xs="4"><h4>Nickname  </h4></Col> <Col xs="7">{newnickname}</Col>
                    <Col><AiOutlineEdit/></Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item >
                    <Row>
                    <Col xs="4"><h4>Email</h4></Col> <Col>{emailPro}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item action onClick={handleShow1}>
                    <Row>
                    <Col xs="4"><h4>Password </h4> </Col> <Col xs="7">**********</Col>
                    <Col><AiOutlineEdit/></Col>
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
          <Modal.Title>Upload Icon</Modal.Title>
        </Modal.Header>
        <form onSubmit={submitAvater}>
        <Modal.Body>
        {error? <Alert show={alertInsideShow} variant="danger">The image must be less than 2 MB</Alert> : <p>the image is good</p>}
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
          <Button variant="secondary" onClick={()=>{setShow2(false);setError(false)}}>
            Close
          </Button>
          {error
          ?(<Button variant="primary">Save Changes</Button>)
          :(<Button variant="primary" type="submit" onClick={handleClose2}>Save Changes</Button>)
          }
        </Modal.Footer>
        </form>
      </Modal>
        </div>
        


    )
}

export default Profile
