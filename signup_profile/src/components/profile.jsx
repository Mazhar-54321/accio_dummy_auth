import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, clearUser } from '../redux/slices/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
    const [user,setUser] = useState({});
    const userId = useSelector(state => state?.user?.user?.id);
    
    const navigate = useNavigate();
    useEffect(()=>{
      
      if(!userId){
        navigate("/")
      }else{
        fetch(`https://dummyjson.com/users/${userId}`).then((res)=>{
          return res.json()
        }).then((res)=>{
          setUser(res);
        }).catch((err)=>{
          alert('Login Failed');
          navigate("/")
        })
      }
    },[userId])
    const clickHandler = ()=>{
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      dispatch(clearUser())
    }
  return (
    <div style={{ width: '100%',padding:'100px' }}>
      <h1>Profile</h1>
      <h2>Full Name:{user?.username}</h2>
      <h2>Email:{user?.email}</h2>
      <h2>Password:{user?.password}</h2>
      <button onClick={clickHandler} style={{padding:'5px 10px'}}>Logout</button>
    </div>
  )
}

export default Profile