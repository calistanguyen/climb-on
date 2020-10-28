import React, { useState } from 'react';
import Caribiner from '../imgs/Carabiner';
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn, checkUser } from "../services/auth"
const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        handleLogin({ username }, { password });
    }

    const handlePassword = event => {
        setPassword(event.target.value);
    }
    const handleUsername = event => {
        console.log('---username---', event.target.value)
        setUsername(event.target.value);
    }


    return (
        <div className='login'>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap" rel="stylesheet" />
            <div className='login-form'>
                <form amethod="post"
                    onSubmit={event => {
                        handleSubmit(event)
                        if (checkUser(username, password)) {
                            navigate(`/dash`)
                        }
                        else {
                            alert('Wrong username or password')
                        }
                    }}>
                    <div className='logo'>climb on!
                        <div>
                            <Caribiner />
                        </div>
                    </div>
                    <div>
                        <label for="fname" className="username">Username</label>
                        <br></br>
                        <input type="text" id="username" name="uname" onChange={handleUsername} />
                    </div>
                    <div>
                        <label for="lname">Password</label>
                        <br></br>
                        <input type="password" id="password" name="pword" onChange={handlePassword} />
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default LogIn;