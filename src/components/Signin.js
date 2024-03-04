import React from "react";
import signinimage from '../images/bg.jpg'
import logo from '../images/logo.jpg'
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/setup";
import { useNavigate } from "react-router-dom";

function Signin() {

    const navigate = useNavigate()

    const googleSignin = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            auth.currentUser && navigate("/")
        } catch (err) {
            console.error(err)
        }
    }

    console.log(auth)
    return (
        <div className="grid grid-cols-2 bg-black h-screen">
            <div className="text-center mt-32">
                <div className="mx-auto max-w-sm">
                    <img src={logo} className="h-10 mx-auto" />
                    <h1 className="text-white text-3xl font-semibold mt-7">Sign in</h1>
                    <button onClick={googleSignin} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-14 w-full mt-8">
                        Sign in
                    </button>
                    <h2 className="text-blue-500 underline mt-7">Sign in now</h2>
                </div>
            </div>

            <div>
                <img src={signinimage} className="h-screen" />
            </div>

        </div>
    )
}

export default Signin