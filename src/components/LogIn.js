import React, { useState } from 'react';
import Caribiner from '../imgs/Carabiner';
import { navigate } from "gatsby"
import { handleLogin, checkUser, resolved } from "../services/auth"

//this is the component that displays the login to the user
const LogIn = () => {
    const [username, setUsername] = useState(''); //states that keep track of the username and password
    const [password, setPassword] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        handleLogin({ username }, { password });
    }

    const handlePassword = event => {
        setPassword(event.target.value);
    }
    const handleUsername = event => {
        setUsername(event.target.value);
    }


    return (
        <div className='login'>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap" rel="stylesheet" />
            <div className='login-form'>
                <form amethod="post"
                    onSubmit={event => {
                        handleSubmit(event)
                        checkUser(username, password).then(auth => { //this checkUser function runs a query with the username and password provided to check if it exists in the data base
                            if (resolved) {
                                navigate('/dash')
                            }
                            else {
                                alert('Wrong username or password')
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }}>
                    <div className='logo'>climb on!
                        <div>
                            <Caribiner />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="fname" className="username">Username</label>
                        <br></br>
                        <input type="text" id="username" name="uname" onChange={handleUsername} />
                    </div>
                    <div>
                        <label htmlFor="lname">Password</label>
                        <br></br>
                        <input type="password" id="password" name="pword" onChange={handlePassword} />
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div >
    );
}
export default LogIn;