import Navigation from './components/Navigation'
import React from 'react'
import { Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <div>
        <Switch>
        <Route exact path="/" component = {Home}/>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/main' component={Main}/>
        </Switch>
      </div>
    </div>
  );
}



export default App;
