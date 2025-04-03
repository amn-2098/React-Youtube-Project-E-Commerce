  // import React, { useState } from 'react';

  // const Login = ({ openSignUp, setIsModelOpen }) => {
  //   const [error, setError] = useState('');

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const email = document.getElementById('email').value;
  //     const password = document.getElementById('password').value;

  //     try {
  //       const response = await fetch('http://localhost:3000/api/auth/login', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ email, password }),
  //       });

  //       const data = await response.json();
  //       console.log("API Response:", data);

  //       if (response.ok) {
  //         localStorage.setItem('token', data.token); // Store token
  //         localStorage.setItem('userEmail', email); // Store user email
  //         alert('Login Successful!');
  //         setIsModelOpen(false); // Close modal
  //       } else {
  //         setError(data.message || 'Invalid credentials');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //       setError('Something went wrong');
  //     }
  //   };

  //   return (
  //     <div>
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
import axios from 'axios'; // Import Axios

const Login = ({ openSignUp, setIsModelOpen }) => {
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      // Sending login request using Axios
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });

      console.log('API Response:', response.data);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); // Store token
        localStorage.setItem('userEmail', email); // Store user email
        alert('Login Successful!');
        setIsModelOpen(false); // Close modal
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700'>Email</label>
          <input type="email" id="email" placeholder='Enter E-mail' name="email" className='w-full px-3 py-2 border' />
        </div>
        <div>
          <label className='block text-gray-700'>Password</label>
          <input type="password" id="password" placeholder='Enter Password' name="password" className='w-full px-3 py-2 border' />
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






