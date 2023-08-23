"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="bg-[#E9E5B2] h-screen flex flex-col items-center justify-center text-center">
        <Image 
          // src="https://evolveyoursuccess.com/wp-content/uploads/2019/12/lightbulb-icon-png-icon-transparent-light-bulb-png.png"
          src = "/images/logo.png"
          width={300}
          height={300}
          alt="logo"
        />
        <button 
          onClick={() => signIn('google')}
          className="text-stone-800 font-bold text-3xl animate-pulse"
        >
          Sign in to use our Content Writer
        </button>
        
    </div>
  )
}

export default Login