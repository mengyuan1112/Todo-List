import React from 'react'
// import Button from './Button'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import { BrowserRouter,Link, Route, Switch } from 'react-router-dom'
import Register from './Register'

const Home = () => {
    return (
        <header>
            <h1>Todo List</h1>
            <BrowserRouter>
            <Link to="/register"> <Button>Register</Button> </Link>

            <Switch>
                <Route path="/register">
                    <Register/>
                </Route>
            </Switch>
            </BrowserRouter>
        </header>
    )
}

export default Home
