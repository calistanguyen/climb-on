import React, { useState } from 'react';
import Caribiner from '../imgs/Carabiner';
import { navigate} from "gatsby"
import { handleLogin, checkUser, getUser, resolved} from "../services/auth"

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
                        checkUser(username, password).then(auth => {
                            if (resolved) {
                                navigate('/dash')
                                console.log('---user----', getUser()); 
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