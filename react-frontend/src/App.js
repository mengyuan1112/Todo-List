import Navigation from './components/Navigation'
import React,{Component} from 'react'
import { Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Main from './components/Main';
import axios from 'axios';



export default class App extends Component  {

  componentDidMount = () =>{
    axios.get('config').then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err)
      }
    )
  };
  render(){
  return (
    <div className="App">
      <Navigation/>
      <div>
        <Switch>
        <Route exact path="/home" component = {Home}/>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/main' component={Main}/>
        <Route exact path="/" component = {Home}/>
        </Switch>
      </div>
    </div>
  );
}
}

