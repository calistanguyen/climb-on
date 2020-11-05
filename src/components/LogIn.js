import React, { useState } from 'react';
import Caribiner from '../imgs/Carabiner';
import { navigate, graphql } from "gatsby"
import { handleLogin, isLoggedIn, checkUser, resolved, isResolved } from "../services/auth"
import { check } from 'prettier';
const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        handleLogin({ username }, { password });
    }

    const handlePassword = event => {
        console.log('---password---', String(event.target.value))
        setPassword(event.target.value);
    }
    const handleUsername = event => {
        console.log('---username---', String(event.target.value))
        setUsername(event.target.value);
    }


    return (
        <div className='login'>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap" rel="stylesheet" />
            <div className='login-form'>
                <form amethod="post"
                    onSubmit={event => {
                        handleSubmit(event)
                        // console.log('----checkuser----', checkUser(username, password))
                        checkUser(username, password)
                        console.log('----resolved----', resolved)
                        // if (resolved) {

                        //     navigate(`/dash`)
                        // }
                        // else {
                        //     alert('Wrong username or password')
                        // }
                        checkUser(username, password).then(auth => {
                            if (auth) {
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
        </div >
    );
}

// export const query = graphql`
// {postgres {
//     allUsers {
//         nodes{
//             firstName
//             lastName
//         }
//     }
// }}`

export default LogIn;