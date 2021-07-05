import Navigation from './components/Navigation'
import React ,{useState,useEffect} from 'react'
import { Switch, Route,useHistory} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Main from './components/Main';
import Profile from './components/Profile'
import Personal from './components/Personal'
import Friend from './components/Friend'
import Summary from './components/Personal'
import Checked from './components/Personal'
import axios from 'axios';




function App() {
  const [name,setName] = useState('');
  const [nickName,setNickName] = useState('');
  const [length,setLength] = useState(0)
  const [expire,setExpire] = useState(false)
  const [img,setImg] = useState('')
  const history = useHistory();

  useEffect(() => {
    axios.get('login').then(
      res => {
        console.log("This is the get request from login (app.js) \n",res)
        if (res.data.result === "Expired"){
          console.log("The user have expired cookie. Setting the name and cookie to be empty.")
          setName("");
          localStorage.clear();
          setExpire(true)
          setNickName("")
          history.push('/home')
        }
        else{
        setExpire(false)
        setName(res.data.username)
        setNickName(res.data.name)
      }
      },
      err => {
        console.log(err);
        setName('')
      })
    },[])

    useEffect(() =>{
      getImage();
    },[name])

    const getImage=()=>{
      if (name){
        axios.get(`${name}/profile`).then((res)=>{
          console.log("I'm in the getImage")
          setImg(res.data.icon)
        })
        .catch(error=>console.log(error))
      }
      else{
        //user is not login.
      }
    }
    const changeImage=(e)=>{
      setImg(e)
    }
    function onChange(e) {
      setName(e)
    }
    const changeNickName=(e)=>{
      setNickName(e)
    }

    return (
        <>
          <Navigation name={name} onNameChange={onChange} img={img} changeNickName={changeNickName} />
            {(name && !expire) ?(
            <Switch>
              <Route exact path={`/:name/home`} component = {()=> <Home name={name} expire={expire} ticketLength={length} nickName={nickName} changeNickName={changeNickName}  onNameChange={onChange} thingsToDo={2}/>}/>
              <Route exact path={`/:name/main`} component={()=> <Main name={name} onNameChange={onChange}/>} />
              <Route exact path={`/:name/personal`} component={()=><Personal name={name} onNameChange={onChange}/>}/>

              <Route exact path={`/:name/personal/friends`}component={()=><Friend name={name} onNameChange={onChange}/>}/>
              <Route exact path={`/:name/personal/summary`}component={()=><Summary name={name} onNameChange={onChange}/>}/>
              <Route exact path={`/:name/personal/checked`}component={()=><Checked name={name} onNameChange={onChange}/>}/>
              


              <Route exact path={`/:name/profile`} component={()=> <Profile name={name} changeNickName={changeNickName} changeImage={changeImage} onNameChange={onChange}/>} />
              <Route exact path={`/:name/`} component = {()=> <Home name={name} expire={expire} ticketLength={length} nickName={nickName} onNameChange={onChange} />}/>
              </Switch>) 
            :(<Switch>
              <Route exact path="/home" component = {()=> <Home name={name} changeNickName={changeNickName} expire={expire} nickName={nickName} ticketLength={length}  onNameChange={onChange} />}/>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={()=> <Login expire={expire} name={name} onNameChange={onChange} changeNickName={changeNickName}/>} />
              <Route exact path="/" component = {()=> <Home name={name} expire={expire} ticketLength={length} nickName={nickName} onNameChange={onChange} />}/>

            </Switch>
              )}
        </>
      );
  }

  export default App;
