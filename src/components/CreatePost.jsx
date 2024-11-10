import React, { useContext } from 'react'
import Navbar from './Navbar'
import { RxCross1 } from "react-icons/rx";
import { useState } from 'react';
import axios from 'axios';
import { URL } from '../url';
import UserContext from '../context/UserContext';
import ThemeContext from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';


function CreatePost() {
    const [cat, setcat] = useState("");
    const [category, setcategory] = useState([])
    const [title, settitle] = useState("")
    const [desc, setdesc] = useState("")
    const { user } = useContext(UserContext)
    const {darkmode} = useContext(ThemeContext)
    const navigate = useNavigate()

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const addCategory = () => {
        let updatedArray = [...category]
        updatedArray.push(cat)
        setcat("")
        setcategory(updatedArray)
    }

    const deleteCategory = (index) => {
        let updatedArray = category.filter((c, i) => i !== index)
        setcategory(updatedArray)
    }
    const handleClick = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('desc', desc);
            formData.append('photo', file); // Append the file
            formData.append('username', user.username);
            formData.append('userId', user.id);
            formData.append('categories',category)

            // Send the POST request with the formData
            const res = await axios.post(URL + "/api/post/create", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            console.log(res.data)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Navbar />
            <div className={`flex justify-center p-2 items-center ${darkmode ? 'bg-white' : 'bg-slate-800'}`}>
                <div className='flex flex-col justify-between w-[90%] h-[567px]'>
                    <div className='mt-5 space-y-5' >
                        <h1 className={`font-extrabold text-2xl ${darkmode ? 'text-black' : 'text-white'}`}>Create a Post</h1>
                        <div className='my-4'>
                            <input type="text" value={title} onChange={(e) => settitle(e.target.value)} placeholder='Enter Post Titile' className={`outline-none ${darkmode ? 'text-black' : 'bg-slate-800 text-white'}`} />
                        </div>
                        <div >
                            <input type="file" onChange={handleFileChange} className={`${darkmode ? 'text-black' : 'bg-slate-800 text-white'}`}/>
                        </div>
                        <div className='flex space-x-5'>
                            <input onChange={(e) => { setcat(e.target.value) }} type="text" value={cat} placeholder='Enter post category' className={`outline-none ${darkmode ? 'text-black' : 'bg-slate-800 text-white'}`} />
                            <button onClick={addCategory} className={`${darkmode ? 'bg-black text-white' : 'bg-slate-400 text-black'} w-20 h-10 text-lg`}>Add</button>
                        </div>
                        <div className='flex space-x-4'>
                            {category.map((cate, index) => (
                                <div key={index} className='flex justify-center items-center bg-slate-400 p-1 rounded space-x-2'>
                                    <p>{cate}</p>
                                    <button onClick={() => deleteCategory(index)}><RxCross1 /></button>
                                </div>
                            ))}
                        </div>
                        <div>
                            <textarea value={desc} onChange={(e) => setdesc(e.target.value)} placeholder='Enter post description' rows={10} className={`outline-none w-[100%] ${darkmode ? 'text-black' : 'bg-slate-800 text-white'}`} />
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button onClick={handleClick} className={`${darkmode ? 'bg-black text-white' : 'bg-slate-400 text-black'} w-96 h-10 text-lg`}>Create</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreatePost
