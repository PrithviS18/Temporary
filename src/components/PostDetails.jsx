import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Comments from './Comments';
import { useParams } from 'react-router-dom';
import { URL } from '../url';
import axios from 'axios';
import UserContext from '../context/UserContext';
import ThemeContext from '../context/ThemeContext';

function PostDetails() {
    const postid = useParams().id
    console.log(postid)
    const [post,setpost] = useState([]);
    const {user} = useContext(UserContext)
    const [comments,setcomments] = useState([])
    const [loading, setLoading] = useState(true);
    const [load, setLoad] = useState(true);
    const [loadc, setLoadc] = useState(true);
    const [com,setcom]=useState("")
    const {darkmode} = useContext(ThemeContext) 

    const fetchpost = async() =>{
        try{
            const res = await axios.get(URL + "/api/post/" + postid)
            setpost(res.data)
        }catch(err){
            console.log(err);
        }finally {
            setLoading(false)
        }
    }

    const fetchcomment = async() =>{
        try{
            const res = await axios.get(URL + "/api/comment/post/" + post._id)
            // console.log(res)
            setcomments(res.data)
        }catch(err){
            console.log(err);
        }finally{
            setLoad(false)
        }
    }

    const handleClick = async() =>{
        const comm=com
        setcom("")
        try {
            const  res = await axios.post(URL + "/api/comment/create", {comment:com, author:user.username, postId:postid, userId:user.id},{withCredentials:true})
            const res1 = await axios.get(URL + "/api/comment/post/" + post._id)
            setcomments(res1.data)
        }catch(err){
            console.log(err)
        }finally{
            setLoadc(false)
        }
    }

    useEffect(()=>{
       fetchpost()
    },[postid])

    // use the useeffect hook to fetch comments and it depends on the post method so it has a dependency on post
    useEffect(()=>{
        fetchcomment()
     },[post])

    if (loading){
        return (
            <p>Loading...</p>
        )
    }
    if (load){
        return (
            <p>Loading...</p>
        )
    }

    return (
        <>
            <Navbar />
            <div className={`flex justify-center p-2 items-center ${darkmode ? 'bg-white' : 'bg-slate-800'}`}>
                <div className='mt-10 flex-col justify-center items-center space-y-5 w-[90%]'>
                    <div className='flex justify-between items-center w-[100%]'>
                        <h1 className={`font-extrabold text-3xl ${darkmode ? 'text-black' : 'text-white'}`}>{post.title}</h1>
                        <div>
                            {user.id===post.userId && <div className={`text-lg ${darkmode ? 'text-black' : 'text-white'} flex justify-between font-semibold italic px-5 space-x-5`}>
                                <MdModeEdit />
                                <MdDelete />
                            </div>}
                        </div>
                    </div>
                    <div className={`text-lg flex justify-between font-semibold ${darkmode ? 'text-slate-500' : 'text-white'} italic px-5 space-x-5`}>
                        <p>@{post.username}</p>
                        <p>{post.updatedAt.substring(0,10)}</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <img className='w-[100%] h-[550px]' src={`${URL}/uploads/${post.photo}`} alt="Not uploaded" />
                        <p className={`mt-5 text-lg px-4 w-[100%] ${darkmode ? 'text-black' : 'text-white'}`}>{post.desc}</p>
                    </div>
                    <div className='flex space-x-2'>
                        <p className={`font-bold text-lg ${darkmode ? 'text-black' : 'text-white'}`}>Categories : </p>
                        {post.categories.map((cat,index) => (
                            <p key={index} className='rounded bg-slate-400 px-2'>{cat}</p>
                        ))}
                    </div>
                    <div className='flex flex-col space-y-3'>
                        <p className={`font-bold text-lg ${darkmode ? 'text-black' : 'text-white'}`}>Comments :</p>
                        {comments.map((c,i) => (<Comments key={i} c={c}/>))}
                    </div>    
                    <div className='flex justify-between items-center'>
                        <input type="text" onChange={(e)=>setcom(e.target.value)} value={com} placeholder='Write a comment' className={`italic w-[900px] text-base outline-none ${darkmode ? 'text-black' : 'bg-slate-800 text-white'}`}/>
                        <button onClick={handleClick} className={` ${darkmode ? 'bg-black text-white' : 'bg-slate-400 text-black'} w-96 h-10`}>Add Comment</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PostDetails
