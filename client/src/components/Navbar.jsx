import React from 'react'

const Navbar = () => {
    const name = "Mehak Narang";
  return (
    <div>
       <div className = "w-full p-3 flex justify-between items-center mx-auto shadow-lg">
            <div>
                <img src = "/logo.svg" height = "100px" width = "130px" />
            </div>
            <div className = "flex gap-5 items-center">
                <p className = "text-sm">Hi, {name}</p>
                <button className = "text-sm  hover: text-md hover:bg-gray-100 border-1 border-gray-300 px-5 py-1 rounded-full cursor-pointer">Logout</button>
            </div>
       </div>
    </div>
  )
}

export default Navbar
