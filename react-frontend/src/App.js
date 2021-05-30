import Navigation from './components/Navigation'
import React ,{useState,useEffect} from 'react'
import { Switch, Route,useParams} from 'react-router-dom';
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
  useEffect(() => {
    axios.get('login').then(
      res => {
        setName(res.data.username)
        setSelf_ticket(res.data.self_ticket)
        setNickName(res.data.name)
        setLength(self_ticket.length)
      },
      err => {
        console.log(err);
        setName('')
      }
    )},[])

    function onChange(newName) {
      setName(newName)
    }

    return (
        <div className="App">
          <Navigation name={name} onNameChange={onChange}/>
          <div>

            {name?(<Switch>


              <Route exact path={`/:name/home`} component = {()=> <Home name={name} nickName={nickName}  onNameChange={onChange} thingsToDo={2}/>}/>

              <Route exact path={`/:name/register`} component={Register} />
              <Route exact path={`/:name/login`} component={()=> <Login name={name} onNameChange={onChange}/>} />
              <Route exact path={`/:name/main`} component={()=> <Main name={name} onNameChange={onChange}/>} />
              <Route exact path={`/:name/profile`} component={()=> <Profile name={name} onNameChange={onChange}/>} />
              <Route exact path={`/:name/`} component = {()=> <Home name={name} nickName={nickName} onNameChange={onChange} />}/>
              </Switch>) 
            :(<Switch>
              <Route exact path="/home" component = {()=> <Home name={name} nickName={nickName}  onNameChange={onChange} />}/>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={()=> <Login name={name} onNameChange={onChange}/>} />
              <Route exact path="/main" component={()=> <Main name={name} onNameChange={onChange}/>} />
              <Route exact path="/profile" component={()=> <Profile name={name} onNameChange={onChange}/>} />
              <Route exact path="/" component = {()=> <Home name={name} nickName={nickName} onNameChange={onChange} />}/>

            </Switch>
              )}
          </div>
        </div>
      );
  }

  export default App;

