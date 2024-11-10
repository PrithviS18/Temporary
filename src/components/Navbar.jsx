import React, { useContext } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useState } from 'react';
import UserContext from '../context/UserContext';
import ThemeContext from '../context/ThemeContext';
import { URL } from '../url'
import axios from 'axios'

function Navbar({ onSearch }) {
    // const [isopen, setopen] = useState(false);
    const { user, setuser } = useContext(UserContext)
    const { darkmode, setdarkmode } = useContext(ThemeContext)
    const navigate = useNavigate()
    const [search, setsearch] = useState('')

    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const Logout = async () => {
        if (user) {
            const res = await axios.get(URL + "/api/auth/logout", { withCredentials: true })
            setuser(null)
            console.log(res)
            localStorage.removeItem('token');
            sessionStorage.removeItem('token')
            navigate("/login")
        }
    }

    const handleClick = () => {
        setdarkmode((prev) => !prev)
        console.log(darkmode)
    }

    // const menu = () => {
    //     if (isopen) setopen(false)
    //     else setopen(true)
    // }

    const Search = (event) => {
        event.preventDefault();
        onSearch(search);
    };

    return (
        <div className={`flex w-full justify-around align-center shadow-lg h-16 ${darkmode ? 'bg-white' : 'bg-black'}`}>
            <div className={`${darkmode ? 'text-black' : 'text-white'} flex justify-center items-center font-extrabold text-xl`}>
                <Link to="/"> Blogarithm</Link>
            </div>
            {isHomePage && <div className='flex justify-center items-center space-x-4'>
                <IoSearchOutline onClick={Search} className={`w-6 h-6 ${darkmode ? 'text-black' : 'text-white'}`} />
                <input type="text" onChange={(e) => { setsearch(e.target.value) }} placeholder='Search a Blog' className={`h-7 px-2 text-sm w-60 outline-none rounded ${darkmode ? 'bg-white text-black' : 'bg-black text-white'}`} />
            </div>}
            <div className='flex justify-center items-center space-x-10'>
                {darkmode ?
                    <button onClick={handleClick}>
                        <MdDarkMode className='w-6 h-6 ' />
                    </button> :
                    <button onClick={handleClick}>
                        <MdOutlineLightMode className='w-10 h-10 text-white' />
                    </button>
                }
                {user ? <Link className={`${darkmode ? 'text-black' : 'text-white'}`} to="/write">Write</Link> : <Link to="/login" className={`${darkmode ? 'text-black' : 'text-white'}`}>Login</Link>}
                {user ? <Link className={`${darkmode ? 'text-black' : 'text-white'}`} to={user ? `/profile/${user.id}` : '/login'}>Profile</Link> : <Link to="/register" className={`${darkmode ? 'text-black' : 'text-white'}`}>Register</Link>}
                {user && <p className={`${darkmode ? 'text-black' : 'text-white'}`} onClick={Logout}>Logout</p>}
            </div>
        </div>
    )
}

export default Navbar
