import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {URL} from '../url.js'

function Register() {
  const [username,setusername]=useState("")
  const [password,setpassword]=useState("")
  const [email,setemail]=useState("")
  const [error,seterror] = useState(null)
  const navigate = useNavigate()

  const handleregister = async() =>{
     try{
      const res = await axios.post( URL +"/api/auth/register",{username,email,password})
      navigate('/login')
      console.log(res.data)
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
        <Link to="/login">Login</Link>
      </div>
    <div className='flex flex-col justify-center items-center w-full h-screen space-y-5'>
      <div className='font-extrabold text-4xl'>Create An Account</div>
      <input type='text' placeholder='Enter Your Username' value={username} onChange={(e)=>setusername(e.target.value)} className='border-2 border-black w-96 px-3 h-8'/>
      <input type='text' placeholder='Enter Your Email' value={email} onChange={(e)=>setemail(e.target.value)} className='border-2 border-black w-96 px-3 h-8'/>
      <input type='password' placeholder='Enter Your Password' value={password} onChange={(e)=>setpassword(e.target.value)} className='border-2 border-black w-96 px-3 h-8'/>
      <button onClick={handleregister} className='border-2 border-black w-96 px-3 h-10 bg-black text-white font-semibold'>Register</button>
      <div>Already Have an Account? <Link to='/login' className='italic text-base text-slate-400' >Log in</Link></div>
    </div>
    </>
  )
}

export default Register
