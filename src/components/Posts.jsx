import React from 'react'
import { URL } from '../url'

function Posts({post}) {
    return (
        <div className='flex w-[80%] justify-center items-center mt-10 space-x-3 bg-slate-200'>
            {/* left */}
            <div >
                <img className='w-[600px] h-60' src={`${URL}/uploads/${post.photo}`} alt="" />
            </div>
            {/* right */}
            <div className='w-[700px] h-60'>
                <h1 className='text-3xl font-extrabold my-2'>{post.title}</h1>
                <div className='flex justify-between font-semibold text-slate-500 italic px-5'>
                    <p>@{post.username}</p>
                    <p>{post.updatedAt.slice(0,10)}</p>
                </div>
                <div className='my-10 text-lg'>
                    {post.desc.slice(0,30)}...Read More
                </div>
            </div>
        </div>
    )
}

export default Posts
