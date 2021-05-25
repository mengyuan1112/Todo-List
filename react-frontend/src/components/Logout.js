import React from 'react'
import { Button } from 'react-bootstrap';
import { GoogleLogout } from 'react-google-login';
import { useHistory } from "react-router-dom";


const Logout = ({name,onNameChange}) => {
    const history = useHistory();
    const onLogout=() =>{
        console.log("Logout")
        onNameChange("")
        localStorage.clear()
        history.push('/home');
    }

    return (
        <div>
            <Button onClick={(e)=>{e.preventDefault(); onLogout()}}>Logout</Button>
        </div>
    )
}

export default Logout
