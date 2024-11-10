import React, { useContext, useEffect, useState } from 'react'
import Posts from './Posts'
import Navbar from './Navbar'
import { URL } from '../url'
import axios from 'axios'
import UserContext from '../context/UserContext'
import ThemeContext from '../context/ThemeContext'
import { Link } from 'react-router-dom'
import Footer from './Footer'


function Home() {
  const {user} = useContext(UserContext)
  const {darkmode} = useContext(ThemeContext)

  const [post, setpost] = useState([])
 
  const getpost = async (term) => {
      try {
        const response = await axios.get(URL + "/api/post", {
          params: { search: term },
        });
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
      <Navbar onSearch={getpost} />
      {/* We need to run the getpost on the first render */}
      <div className={`flex flex-col p-5  justify-start items-center ${darkmode ? 'bg-white' : 'bg-slate-800'}`}>
      {post.map ((post,index) => (
        // console.log(post.photo)
        <Link key={index} className='flex justify-center items-center' to={user ? `/posts/post/${post._id}`: "/login"}>
        <Posts  post={post}/>
        </Link> 
        ))}
      </div>
    </>
  )
}

export default Home
