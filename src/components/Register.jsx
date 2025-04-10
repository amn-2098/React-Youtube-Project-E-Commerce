// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Importing eye icons

// const Register = ({ openLogin, setIsModelOpen }) => {
// };

// export default Register;






import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Importing eye icons
import apiClient from '../lib/api/apiServices'; // Import the apiClient
import apiEndpoints from '../lib/api/config'; // Import your API endpoints
import { API_BASE_URL, apiConfig } from '../lib/api/config'; // Ensure the path is correct


const Register = ({ openLogin, setIsModelOpen }) => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Handles form submission  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if apiEndpoints and apiEndpoints.auth.register are defined
    console.log('API Base URL:', API_BASE_URL);
    console.log('API Endpoints:', apiEndpoints);
    console.log('Register Endpoint:', apiEndpoints.auth?.register);
  
    if (!apiEndpoints.auth?.register) {
      toast.error('Register API endpoint is missing');
      return;
    }
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long', { autoClose: 2000 });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Enter a valid email address', { autoClose: 2000 });
      return;
    }
  
    try {
      const response = await apiClient.post(apiEndpoints.auth.register, {
        name,
        email,
        password
      });
  
      if (response.status === 200) {
        toast.success('User registered successfully!', { autoClose: 2000 });
        setTimeout(() => openLogin(), 2500); // Redirect after toast
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };
  

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      {/* Sign-up heading */}
      <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>

      {/* Sign-up form */}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700'>Name</label>
          <input
            type="text"
            id="name"
            placeholder='Enter Name'
            name="name"
            className='w-full px-3 py-2 border'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Email</label>
          <input
            type="email"
            id="email"
            placeholder='Enter E-Mail'
            name="email"
            className='w-full px-3 py-2 border'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              id="password"
              placeholder='Enter Password'
              name="password"
              className='w-full px-3 py-2 border'
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility on button click
            >
              {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />} {/* Eye icon */}
            </button>
          </div>
        </div>

        {/* Sign-up button */}
        <div className='mb-4'>
          <button type="submit" className='w-full bg-red-600 text-white py-2'>
            Sign Up
          </button>
        </div>
      </form>

      {/* Login redirect */}
      <div className='text-center'>
        <span className='text-gray-700'>Already have an account?</span>
        <button className='text-red-800 ml-2' onClick={openLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;

