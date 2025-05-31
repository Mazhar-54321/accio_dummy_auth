import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [userObj, setUserObj] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessfullySignedUp, setIsSuccessfullySignedUp] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (user?.token) {
            navigate('/profile');
        }
    }, [user])
    useEffect(() => {
        const token = (localStorage.getItem('token'));
        const id = localStorage.getItem('id')
        dispatch(setUser({  token: token ,id:id }))
    }, [])
    const onSubmit = (event) => {
        event.preventDefault();
        const { name, email, password, confirmPassword } = userObj
        if (!name && !email && !password && !confirmPassword) {
            setErrorMessage('All fields are mandatory');
            return;
        }
        if (!name || !email || !password || !confirmPassword) {
            setErrorMessage('All fields are mandatory');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        
        setErrorMessage('');
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userObj?.name,
                password: userObj?.password
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setIsSuccessfullySignedUp(true);
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('id', data.id);
                setTimeout(() => {
                    dispatch(setUser({ token: data.accessToken,id:data.id }))
                }, 1000)
            })
            .catch(error => {
                setErrorMessage('Login failed:')
            });
        
    }
    const onChangeHandler = (key, value) => {
        setUserObj((prev) => ({
            ...prev, [key]: value
        }))
    }
    return (
        <div style={{ width: '100%', padding: '100px' }}>
            <header>
                <h1>Signup</h1>
            </header>
            <main className="main-container">
                <form method="post" onSubmit={(event) => { onSubmit(event) }}>
                    <input type="text" onChange={(event) => onChangeHandler('name', event.target.value)} placeholder="Full Name" />
                    <input type="text" onChange={(event) => onChangeHandler('email', event.target.value)} placeholder="Email" />
                    <input type="password" onChange={(event) => onChangeHandler('password', event.target.value)} placeholder="Password" />
                    <input type="password" onChange={(event) => onChangeHandler('confirmPassword', event.target.value)} placeholder="Confirm password" />
                    {Boolean(errorMessage) && <p className='error-message'>{errorMessage}</p>}
                    {isSuccessfullySignedUp && <p style={{ color: 'green' }}>Successfully signed up</p>}
                    <button type="submit">Signup</button>
                </form>
            </main>
        </div>
    )
}

export default SignUp