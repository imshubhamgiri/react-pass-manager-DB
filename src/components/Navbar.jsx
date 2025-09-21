import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white px-6">
      <div className="myContainer flex flex-row justify-between items-center p-4">
        <div className="logo font-bold text-2xl ">
          <span className='text-green-700'>&lt; The</span>
          Pass🗝️
          <span className='text-green-700'>/&gt;</span>
          </div>
        {/* <ul className="flex flex-row space-x-4">
          <li className='flex  gap-4'>
            <a href="/" className='hover:underline hover:font-bold'>Home</a>
            <a href="/about" className='hover:underline hover:font-bold'>About</a>
            <a href="/contact" className='hover:underline hover:font-bold'>Contact</a>
          </li>

        </ul> */}
        <button className='bg-green-600 flex justify-around items-center rounded-full px-1 cursor-pointer'>
          <img src="icons/github.png" className='' width={32} alt="" />
          <span className='py-1 font-bold'>GitHub</span></button>
      </div>
    </nav>
  )
}

export default Navbar
