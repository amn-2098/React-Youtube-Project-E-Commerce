import React from 'react'

const Register = ({openLogin}) => {
  return (
    <div>
        <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
        <form>
        <div className='mb-4'>
                <label className='block text-gray-700' >Name</label>
                <input type="text" id="name" placeholder='Enter Name' name="name" className='w-full px-3 py-2 border ' />
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700' >Email</label>
                <input type="email" id="email" placeholder='Enter E-Mail' name="email" className='w-full px-3 py-2 border ' />
            </div>
            <div>
                <label className='block text-gray-700'>Password</label>
                <input type="password" id="password" placeholder='Enter Password' name="password" className='w-full px-3 mb-4 py-2 border '/>
            </div>
            <div className='mb-4'>
                <button type="submit" className='w-full bg-red-600 text-white py-2 '>Sign Up</button>
            </div>
        </form>
        <div className='text-center'>
            <span className='text-gray-700'>Already have an account?</span>
            <button className='text-red-800 ml-2' onClick={openLogin}>Login</button>
        </div>
    </div>
  )
}

export default Register