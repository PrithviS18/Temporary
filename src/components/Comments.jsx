import React, { useContext, useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import UserContext from '../context/UserContext';
import { URL } from '../url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Comments({c}) {
    const {user} = useContext(UserContext)
    const [load,setload] = useState(true)
    const navigate = useNavigate()

    const Editcomment = async() =>{
        // try{
        //     const res = await axios.put(URL + "/api/comment/" + c._id)
        //     console.log(res.data)
        // }catch(err){
        //     console.log(err)
        // }
    }

    const Deletecomment = async() =>{
        try{
            const res=await axios.delete(URL + "/api/comment/" + c._id,{withCredentials:true})
            console.log(res.data)
            window.location.reload(true)
        }catch(err){
            console.log(err)
        }finally{
            setload(false)
        }
    }

    // if (load){
    //     return (
    //         <p>Loading...</p>
    //     )
    // }

    return (
        <div className='bg-slate-300 rounded px-2 py-2 space-y-2'>
            <div className='text-base flex justify-between font-semibold text-black italic px-5 space-x-5'>
                <p>@{c.author}</p>
                <p>{c.updatedAt.slice(0,10)}</p>
            </div>
            <div className='text-base flex justify-between font-semibold text-black italic px-5 space-x-5'>
                <p>{c.comment}</p>
                {user.id===c.userId && <div className='text-base text-black flex justify-between font-semibold italic px-5 space-x-5'>
                    <MdModeEdit onClick={Editcomment}/>
                    <MdDelete onClick={Deletecomment}/>
                </div>}
            </div>
        </div>
  )
}

export default Comments
