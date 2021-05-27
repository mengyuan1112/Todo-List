import Navigation from './components/Navigation'
import React ,{useState,useEffect} from 'react'
import { Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Main from './components/Main';
import Profile from './components/Profile'
import axios from 'axios';



function App() {
  const [name,setName] = useState('');

  useEffect(() => {
    axios.get('login').then(
      res => {
        setName(res.data.name)
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
            <Switch>
            <Route exact path="/home" component = {()=> <Home name={name}  onNameChange={onChange} />}/>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={()=> <Login name={name} onNameChange={onChange}/>} />
            <Route exact path='/main' component={()=> <Main name={name} onNameChange={onChange}/>} />
            <Route exact path="/" component = {()=> <Home name={name} onNameChange={onChange} />}/>
            <Route exact path="/profile" component={()=> <Profile name={name} onNameChange={onChange}/>}></Route>
            </Switch>
          </div>
        </div>
      );
  }

  export default App;

