
// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = ({ openSignUp, setIsModelOpen }) => {
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault(); 

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });

//       console.log('API Response:', response.data);

//       if (response.status === 200) {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('userEmail', email);
        
//         toast.success('Login Successful!'); // Success toast
//         setTimeout(() => setIsModelOpen(false), 1500); // Close modal after delay
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       console.log(error.response); // Check full API response
//       setError(error.response?.data?.message || 'Invalid credentials');
//       toast.error(error.response?.data?.message || 'Invalid credentials');
//     }
    
//   };

//   return (
//     <div>
//       <ToastContainer position="top-right" autoClose={2000} /> {/* Toast Container */}
//       <h2 className='text-2xl font-bold mb-4'>Login</h2>
//       {error && <p className="text-red-600">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className='mb-4'>
//           <label className='block text-gray-700'>Email</label>
//           <input type="email" id="email" placeholder='Enter E-mail' name="email" className='w-full px-3 py-2 border' />
//         </div>
//         <div>
//           <label className='block text-gray-700'>Password</label>
//           <input type="password" id="password" placeholder='Enter Password' name="password" className='w-full px-3 py-2 border' />
//         </div>
//         <div className='mb-4 flex justify-between items-center'>
//           <label className='inline-flex items-center'>
//             <input type="checkbox" className='form-checkbox' />
//             <span className='ml-2 text-gray-700'>Remember me!</span>
//           </label>
//           <a href="#" className='text-red-800'>Forgot Password?</a>
//         </div>
//         <div className='mb-4'>
//           <button type="submit" className='w-full bg-red-600 text-white py-2'>Login</button>
//         </div>
//       </form>
//       <div className='text-center'>
//         <span className='text-gray-700'>Don't have an account?</span>
//         <button className='text-red-800 ml-2' onClick={openSignUp}>Sign Up</button>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Importing eye icons
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook

const Login = ({ openSignUp, setIsModelOpen }) => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });

      console.log('API Response:', response.data);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail', email);
        
        toast.success('Login Successful!');
        setTimeout(() => {
          setIsModelOpen(false); // Close the modal
          navigate('/'); // Redirect to home route
        }, 1500);
      }
    } catch (error) {
      console.error('Error:', error);
      console.log(error.response); // Check full API response
      setError(error.response?.data?.message || 'Invalid credentials');
      toast.error(error.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className='text-2xl font-bold mb-4'>Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700'>Email</label>
          <input type="email" id="email" placeholder='Enter E-mail' name="email" className='w-full px-3 py-2 border' />
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
        <div className='mb-4 flex justify-between items-center'>
          <label className='inline-flex items-center'>
            <input type="checkbox" className='form-checkbox' />
            <span className='ml-2 text-gray-700'>Remember me!</span>
          </label>
          <a href="#" className='text-red-800'>Forgot Password?</a>
        </div>
        <div className='mb-4'>
          <button type="submit" className='w-full bg-red-600 text-white py-2'>Login</button>
        </div>
      </form>
      <div className='text-center'>
        <span className='text-gray-700'>Don't have an account?</span>
        <button className='text-red-800 ml-2' onClick={openSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
