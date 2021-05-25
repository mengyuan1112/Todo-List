import Navigation from './components/Navigation'
import React ,{useState,useEffect} from 'react'
import { Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Main from './components/Main';
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
            <Route exact path={{name} + "/home"} component = {()=> <Home name={name}  onNameChange={onChange} />}/>
            <Route exact path={{name} + "/register"} component={Register} />
            <Route exact path={{name} + "/login"} component={()=> <Login name={name} onNameChange={onChange}/>} />
            <Route exact path={{name} + "/main"} component={()=> <Main name={name} onNameChange={onChange}/>} />
            <Route exact path={{name} + "/profile"} component={()=> <Profile name={name} onNameChange={onChange}/>} />
            <Route exact path={{name} + "/"} component = {()=> <Home name={name} onNameChange={onChange} />}/>
            </Switch>
          </div>
        </div>
      );
  }

  export default App;

