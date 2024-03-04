import React from 'react'
import logo from '../images/logo.jpg'
import user from "../images/585e4bf3cb11b227491c339a.png"
import search from "../images/search.png"
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase/setup'
import { signOut } from 'firebase/auth'


const Navbar = (props) => {

    const navigate = useNavigate()

    const logout = async () => {
        try {
            await signOut(auth)
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    }

    console.log(auth)

    return (
        <div className='grid grid-cols-3 bg-black text-white fixed w-full'>
            <div className='flex p-4 gap-3'>
                <img src={logo} className='h-10 ' />
                {auth.currentUser ?
                    <button onClick={logout} className='text-white flex items-center hover:border border-white px-2 gap-2'>
                        Logout
                    </button>
                    : <Link to='/signin'>
                        <button className='text-white flex items-center hover:border border-white px-2 w-36 gap-2'>
                            <img src={user} className='h-7'></img>
                            Signin
                        </button>
                    </Link>}

            </div>
            <div className='flex gap-6 font-semibold text-sm'>
                <button onClick={() => props.setMenu("indonesia")}>
                    Home
                </button>
                <button onClick={() => props.setMenu("pemerintah")}>
                    Politik
                </button>
                <button onClick={() => props.setMenu("olahraga")}>
                    Olahraga
                </button>
                <button onClick={() => props.setMenu("wisata")}>
                    Wisata
                </button>
                <button onClick={() => props.setMenu("budaya")}>
                    Budaya
                </button>
                <button onClick={() => props.setMenu("teknologi")}>
                    Teknologi
                </button>
                <button onClick={() => props.setMenu("banyumas")}>
                    Banyumas
                </button>

            </div>
            <div className='flex p-5 items-center gap-3 ml-40'>
                <img src={search} className='h-5' />
                <input onChange={(e) => props.setSearch(e.target.value)} className='flex bg-black text-white border-white' placeholder='Golet dewe'/>

            </div>
        </div>
    )
}

export default Navbar