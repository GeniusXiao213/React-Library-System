import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsersContext } from '../contexts/users';

const Login = () => {
    const { loginUser } = useUsersContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg,setErrorMsg]=useState('');
    const navigate = useNavigate();

    const checkLogin=()=>{
        if(!username || !password)
        {
            setErrorMsg("field cannot be empty!")
            return;
        }
        const res = loginUser(username, password);
        if (!res) {
            setErrorMsg("Login or Passwork does not match! Try again!");
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        checkLogin();
        const res = loginUser(username, password);
        if (res) {
            if (username === 'librarian')
                navigate('admin');
            else
                
                navigate('dashboard');
        }
    }

    return (
        <form onSubmit={submitHandler} className='loginForm'>
            <h3>Welcome Dear customer!</h3>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            {errorMsg&&(
                <div className='error'>
                    <h5>{errorMsg}</h5>
                </div>
            )}
            <br />
            <button className='btn'>Login</button>
            <br />
            <hr style={{width: '100%'}} />
            <br />
            
            <span>Don't have an account already?</span>
            
            <Link to='/register'>Register</Link>
            
        </form>
    )
}

export default Login;