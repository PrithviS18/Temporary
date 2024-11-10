import React, { useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {URL} from '../url'
import axios from 'axios'
import UserContext from '../context/UserContext'
import ThemeContext from '../context/ThemeContext'

function Login() {
  const [password,setpassword]=useState("")
  const [email,setemail]=useState("")
  const [error,seterror] = useState(null)
  const navigate = useNavigate()
  const {setuser} = useContext(UserContext)
  const {setdarkmode} = useContext(ThemeContext)

  const handlelogin = async() =>{
    try{
      const res = await axios.post( URL + "/api/auth/login", {email,password}, {withCredentials:true})
      setuser(res.data)
      console.log(res.data)
      setdarkmode((prev) => true)
      navigate("/")
    }catch(err){
      seterror(err)
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex w-full justify-around align-center my-2 space-x-96'>
        <div className='font-extrabold text-xl'>
          <Link to="/"> Blogarithm</Link>
        </div>
        <Link to="/register">Register</Link>
      </div>
      <div className='flex flex-col justify-center items-center w-full h-screen space-y-5'>
        <div className='font-extrabold text-4xl'>Log into your Account</div>
        <input type='text' placeholder='Enter Your email' value={email} onChange={(e)=>setemail(e.target.value)} className='border-2 border-black w-96 px-3 h-8' />
        <input type='password' placeholder='Enter Your Password' value={password} onChange={(e)=>setpassword(e.target.value)} className='border-2 border-black w-96 px-3 h-8' />
        <button onClick={handlelogin} className='border-2 border-black w-96 px-3 h-10 bg-black text-white font-semibold'> Log in</button>
        <div>New here? <Link to='/register' className='italic text-base text-slate-400' >Register</Link></div>
      </div>
    </>
  )
}

export default Login
