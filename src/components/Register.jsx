// import React from 'react';

// const Register = ({ openLogin, setIsModelOpen }) => {

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
    
//   //   // Simulate registration process
//   //   const name = document.getElementById('name').value;
//   //   const email = document.getElementById('email').value;
//   //   const password = document.getElementById('password').value;

//   //   // Normally here you would hash the password or send it to your server for processing.
//   //   alert('Registration Successful!');
    
//   //   // Close the modal after registration
//   //   setIsModelOpen(false);
//   // };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
  
//     // Validation
//     if (password.length < 8) {
//       alert('Password must be at least 8 characters long');
//       return;
//     }
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       alert('Enter a valid email address');
//       return;
//     }
  
//     try {
//       const response = await fetch('http://localhost:3000/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });
  
//       const data = await response.json();
//       console.log('API Response:', data);
  
//       if (response.ok) {
//         alert('Registration Successful!');
//         openLogin(); // Redirect to Login Page
//       } else {
//         alert(data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Something went wrong');
//     }
//   };
//   ;
  
  


//   return (
//     <div>
//       <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div className='mb-4'>
//           <label className='block text-gray-700'>Name</label>
//           <input
//             type="text"
//             id="name"
//             placeholder='Enter Name'
//             name="name"
//             className='w-full px-3 py-2 border'
//           />
//         </div>
//         <div className='mb-4'>
//           <label className='block text-gray-700'>Email</label>
//           <input
//             type="email"
//             id="email"
//             placeholder='Enter E-Mail'
//             name="email"
//             className='w-full px-3 py-2 border'
//           />
//         </div>
//         <div>
//           <label className='block text-gray-700'>Password</label>
//           <input
//             type="password"
//             id="password"
//             placeholder='Enter Password'
//             name="password"
//             className='w-full px-3 mb-4 py-2 border'
//           />
//         </div>
//         <div className='mb-4'>
//           <button type="submit" className='w-full bg-red-600 text-white py-2'>
//             Sign Up
//           </button>
//         </div>
//       </form>
//       <div className='text-center'>
//         <span className='text-gray-700'>Already have an account?</span>
//         <button className='text-red-800 ml-2' onClick={openLogin}>
//   Login
// </button>

//       </div>
//     </div>
//   );
// };

// export default Register;



import React from 'react';
import axios from 'axios'; // Import Axios

const Register = ({ openLogin, setIsModelOpen }) => {

  // Handles form submission  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission

    // Get input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validation checks
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) { // Basic email validation
      alert('Enter a valid email address');
      return;
    }

    try {
      // Sending registration data to API using Axios
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        name,
        email,
        password
      });

      console.log('API Response:', response.data);

      if (response.status === 200) {
        alert('Registration Successful!');
        openLogin(); // Open login page after successful registration
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
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
        <div>
          <label className='block text-gray-700'>Password</label>
          <input
            type="password"
            id="password"
            placeholder='Enter Password'
            name="password"
            className='w-full px-3 mb-4 py-2 border'
          />
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








