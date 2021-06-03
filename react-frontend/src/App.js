import Navigation from './components/Navigation'
import React ,{useState,useEffect} from 'react'
import { Switch, Route,useHistory} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Main from './components/Main';
import Profile from './components/Profile'
import axios from 'axios';




function App() {
  const [name,setName] = useState('');
  const [self_ticket,setSelf_ticket] = useState([]);
  const [nickName,setNickName] = useState('');
  const [length,setLength] = useState(0)

  const [img,setImg] = useState('')

  useEffect(() => {
    axios.get('login').then(
      res => {
        console.log("This is the get request from login:\n",res)
        if (res.data.result === "Expired"){
          history.push('/home')
          setExpire(true)
        }
        else{
          setExpire(false)
          setName(res.data.username)
          setSelf_ticket(res.data.self_ticket)
          setNickName(res.data.name)
          setLength(res.data.self_ticket.length)
        }
      },
      err => {
        console.log(err);

        setName('')
        history.push('/home')
      })
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
    }


    function onChange(newName) {
      setName(newName)
    }

    return (
        <div className="App">
          <Navigation name={name} onNameChange={onChange} img={img}/>
          <div>

            {name?(<Switch>


              <Route exact path={`/:name/home`} component = {()=> <Home name={name} expire={expire} ticketLength={length} nickName={nickName}  onNameChange={onChange} thingsToDo={2}/>}/>

              <Route exact path={`/:name/register`} component={Register} />
              <Route exact path={`/:name/login`} component={()=> <Login name={name} onNameChange={onChange}/>} />
              <Route exact path={`/:name/main`} component={()=> <Main name={name} onNameChange={onChange}/>} />

              <Route exact path={`/:name/profile`} component={()=> <Profile name={name} onNameChange={onChange}/>} />
              <Route exact path={`/:name/`} component = {()=> <Home name={name} expire={expire} ticketLength={length} nickName={nickName} onNameChange={onChange} />}/>

              </Switch>) 
            :(<Switch>
              <Route exact path="/home" component = {()=> <Home name={name} expire={expire} nickName={nickName} ticketLength={length}  onNameChange={onChange} />}/>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={()=> <Login name={name} onNameChange={onChange}/>} />
              <Route exact path="/main" component={()=> <Main name={name} onNameChange={onChange}/>} />

              <Route exact path="/profile" component={()=> <Profile name={name} onNameChange={onChange}/>} />
              <Route exact path="/" component = {()=> <Home name={name} expire={expire} ticketLength={length} nickName={nickName} onNameChange={onChange} />}/>


            </Switch>
              )}
          </div>
        </div>
      );
  }

  export default App;
