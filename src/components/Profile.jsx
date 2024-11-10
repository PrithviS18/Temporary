import React, { useEffect, useContext, useState } from 'react'
import Navbar from './Navbar'
import Posts from './Posts'
import UserContext from '../context/UserContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../url'
import ThemeContext from '../context/ThemeContext'
import Footer from './Footer'

function Profile() {
  const { user,setuser } = useContext(UserContext)
  const {darkmode} = useContext(ThemeContext)
  const navigate = useNavigate()
  // window.location.reload(true)
  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [])
  console.log(user)
  const [username, setusername] = useState(user.username)
  const [email, setemail] = useState(user.email)
  const [password, setpassword] = useState("")
  const [post, setpost] = useState([])

  const DeleteUser = async()=>{
    try{
      // const id=user.id
      const res = await axios.delete(URL + "/api/user/" + user.id,{withCredentials:true})
      console.log(res)
      setuser(null)
      navigate('/')
    }catch(err){
      console.log(err)
    }
  }

  const UpdateUser = async()=>{
    try{
      // const id=user.id
      const res = await axios.put(URL + "/api/user/" + user.id,{username,email,password},{withCredentials:true})
      console.log(res)
      setuser(null)
      navigate('/')
    }catch(err){
      console.log(err)
    }
  }

  const getpost = async (term) => {
    try {
      const response = await axios.get(URL + "/api/post/user/" + user.id, { withCredentials: true });
      setpost(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setpost([]);
    }
  };

  useEffect(() => {
    getpost(); // Load posts on first render
  }, []);

  return (
    <>
      <Navbar />
      <div className={`flex justify-center items-center ${darkmode ? 'bg-white' : 'bg-slate-800'}`}>
        <div className='flex flex-row justify-center relative m-5'>
          <div className='flex flex-col justify-center mt-4 items-center w-[1200px]'>
            <h1 className={`font-bold text-xl ${darkmode ? 'text-black' : 'text-white'}`}>Your Posts</h1>
            {post.map((c, i) => (
              <Posts key={i} post={c} />
            ))}
          </div>
          <div className='space-y-5 mt-4 w-[500px]'>
            <h1 className={`font-bold text-xl ${darkmode ? 'text-black' : 'text-white'}`}>Profile</h1>
            <input value={username} onChange={(e) => setusername(e.target.value)} className={`text-lg w-[100%] outline-none ${darkmode ? 'text-black' : 'bg-slate-800 text-white'}`} type="text" placeholder='Enter Your username' />
            <input value={email} onChange={(e) => setemail(e.target.value)} className={`text-lg w-[100%] outline-none ${darkmode ? 'text-black' : 'bg-slate-800 text-white'}`} type="text" placeholder='Enter email' />
            <input value={password} onChange={(e) => setpassword(e.target.value)} className={`text-lg w-[100%] outline-none ${darkmode ? 'text-black' : 'bg-slate-800 text-white'}`} type="password" placeholder='Enter password' />
            <div className='flex space-x-4'>
              <button onClick={UpdateUser} className={`w-32 h-10  text-lg ${darkmode ? 'bg-black text-white' : 'bg-slate-400 text-black'}`}>Update</button>
              <button onClick={DeleteUser} className={`w-32 h-10 text-lg ${darkmode ? 'bg-black text-white' : 'bg-slate-400 text-black'}`}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Profile

