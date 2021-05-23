import React from 'react'
import { Button } from 'react-bootstrap';
import { GoogleLogout } from 'react-google-login';
import { useHistory } from "react-router-dom";


const Logout = () => {
    const history = useHistory();
    const onLogout=() =>{
        console.log("Logout")
        history.push('/');
    }
    const logout=()=>{
        console.log("logout from google")
        history.push('/');
    }

    return (
        <div>
            <Button onClick={(e)=>{e.preventDefault(); onLogout()}}>Logout</Button>
            <GoogleLogout
                clientId="551326818999-6bjhvslugav8rj9lsa10j4ur0pcm3mlb.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
            />
        </div>
    )
}

export default Logout
