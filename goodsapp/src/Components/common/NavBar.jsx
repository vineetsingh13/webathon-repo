import React from 'react'
import logo from "../../assests/logo.jpg"
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex w-full  bg-richblack-900 text-richblack-5'>


    <nav className='flex auto-mx w-11/12 justify-between'>

        <img src={logo} alt=""  className='h-full '/>

        <div className='flex text-richblack-5'>
        <div>Home</div>
        <div>Products</div>
        <div>About</div>

        <div className='flex justify-between'>

            <NavLink>Login</NavLink>
            <NavLink>SignUp</NavLink>
        </div>

        </div>

    </nav>

    </div>
  )
}

export default NavBar