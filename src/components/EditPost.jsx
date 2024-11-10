import React from 'react'
import Navbar from './Navbar'
import { RxCross1 } from "react-icons/rx";
import { useState } from 'react';


function CreatePost() {
    const [cat,setcat] = useState("");
    const [category,setcategory]=useState([])

    const addCategory = () =>{
        let updatedArray = [...category]
        updatedArray.push(cat)
        setcat("")
        setcategory(updatedArray)
    }

    const deleteCategory = (index) =>{
        let updatedArray = category.filter((c,i) => i!==index)
        setcategory(updatedArray)
    }

  return (
    <>
    <Navbar/>
    <div className='flex justify-center items-center'> 
    <div className='flex flex-col justify-between w-[90%] h-[567px]'>
        <div className='mt-5 space-y-5' >
            <h1 className='font-extrabold text-2xl'>Update Post</h1>
            <div className='my-4'>
                <input type="text" placeholder='Enter Post Titile' className=' outline-none'/>
            </div>
            <div >
                <input type="file" />
            </div>
            <div className='flex space-x-5'>
                <input onChange={(e)=>{setcat(e.target.value)}} type="text" value={cat} placeholder='Enter post category' className='outline-none'/>
                <button onClick={addCategory} className='bg-black text-white w-20 h-10 text-lg'>Add</button>
            </div>
            <div className='flex space-x-4'>
                {category.map((cate,index) => (
                    <div key={index} className='flex justify-center items-center bg-slate-400 p-1 rounded space-x-2'>
                    <p>{cate}</p>
                    <button onClick={()=>deleteCategory(index)}><RxCross1 /></button>
                </div>
            ))}
            </div>
            <div>
                <textarea placeholder='Enter post description' rows={10} className='outline-none w-[100%]'/>
            </div>
        </div>
        <div className='flex justify-center items-center'>
            <button className='bg-black text-white w-96 h-10 text-lg'>Update</button>
        </div>
    </div>
    </div>
    </>
  )
}

export default CreatePost
