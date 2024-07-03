import React, {useRef} from 'react'
import { LuLogIn } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { IoMdPerson } from "react-icons/io";

export const LoginModal = ({closeModal}) => {
    const modalRef = useRef();
   const router = useRouter();
    const handleClick = (e) => {
      if (modalRef.current === e.target) closeModal();
    };
 

  return (
    <div
    ref={modalRef}
    onClick={handleClick}
    className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30 flex items-center justify-center"
  >
    <div className="md:w-[26rem] w-[95vw] bg-white rounded-lg drop-shadow-md flex flex-col gap-5 pb-6 ">
      <div className="flex flex-row  justify-between text-xl gap-5 px-8 py-4 border-b-[1px] border-gray-200">
        <h1 className="font-semibold">Login to continue</h1>
        <button className=" opacity-20" onClick={closeModal}>
          <IoClose size={26} />
        </button>
      </div>
      <div className='flex flex-col py-2 px-6  text-lg'>
      <button onClick={()=>router.replace('/login')} className=' rounded-xl py-2 mb-5 bg-blue-400 text-white flex flex-row items-center justify-center gap-2  '>

      <LuLogIn />
        Login
      </button>
      <h3 className='font-semibold text-base'>New User?</h3>
      <button onClick={()=>router.replace('/register')} className=' mt-1 text-center rounded-xl py-2 bg-blue-400 text-white flex flex-row gap-2 items-center justify-center '>
      <IoMdPerson />
        Register
      </button>
      </div>
      
    </div>
  </div>
  )
}
