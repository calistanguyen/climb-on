import React from 'react';

const LogIn = () => {
    return (
        <div className='login'>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap" rel="stylesheet" />
            <div className='login-form'>
                <form action="/action_page.php">
                    <div className='logo'>climb on!</div>
                    <div>
                        <label for="fname" className="username">Username</label>
                        <br></br>
                        <input type="text" id="fname" name="fname" />
                    </div>
                    <div>
                        <label for="lname">Password</label>
                        <br></br>
                        <input type="password" id="lname" name="lname" />
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default LogIn;