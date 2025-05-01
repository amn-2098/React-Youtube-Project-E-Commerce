import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Login = ({ openSignUp, setIsModelOpen, setIsLoggedIn }) => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [useOtp, setUseOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(0); // Timer state for countdown (in seconds)
  const navigate = useNavigate();

  // Effect for countdown timer when OTP is sent
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      // toast.error('OTP expired!');
      setOtpSent(false); // Disable OTP verification after expiration
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount or dependency change
  }, [otpSent, timer]);

  // Handle password-based login
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', response.data.user.name);
      setIsLoggedIn(true);
      toast.success('Login Successful!');
      setTimeout(() => {
        setIsModelOpen(false);
        navigate('/');
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid credentials');
      toast.error(error.response?.data?.message || 'Invalid credentials');
    }
  };

  // Handle OTP actions: sending OTP and verifying OTP
  const handleOtpAction = async () => {
    const email = document.getElementById('email').value;

    if (!otpSent) {
      try {
        // Send OTP
        await axios.post('http://localhost:3000/api/auth/send-otp', { email });
        setOtpSent(true);
        setTimer(300); // Reset to 5 minutes (300 seconds)
        toast.success('OTP sent to email!');
      } catch (err) {
        toast.error('Failed to send OTP');
      }
    } else {
      // Verify OTP
      try {
        const response = await axios.post('http://localhost:3000/api/auth/verify-otp', { email, otp });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', response.data.user.name);
        setIsLoggedIn(true);
        toast.success('OTP Verified!');
        setTimeout(() => {
          setIsModelOpen(false);
          navigate('/');
        }, 1500);
      } catch (err) {
        toast.error('Invalid OTP');
      }
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className='text-2xl font-bold mb-4'>Login</h2>
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handlePasswordLogin}>
        <div className='mb-4'>
          <label className='block text-gray-700'>Email</label>
          <input type="email" id="email" placeholder='Enter E-mail' name="email" className='w-full px-3 py-2 border' required />
        </div>

        {!useOtp && (
          <>
            <div className='mb-4'>
              <label className='block text-gray-700'>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder='Enter Password'
                  name="password"
                  className='w-full px-3 py-2 border'
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                </button>
              </div>
            </div>
            <div className='mb-4'>
              <button type="submit" className='w-full bg-red-600 text-white py-2'>Login</button>
            </div>
          </>
        )}
      </form>

      {/* OTP Login Section */}
      {useOtp && (
        <>
          {otpSent && (
            <div className='mb-4'>
              <label className='block text-gray-700'>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className='w-full px-3 py-2 border'
                required
              />
              <p className="text-sm text-red-600">{`Time left: ${Math.floor(timer / 60)}:${timer % 60}`}</p> {/* Display countdown */}
            </div>
          )}
          <div className='mb-4'>
            <button
              type="button"
              onClick={handleOtpAction}
              className='w-full bg-blue-600 text-white py-2'
            >
              {otpSent ? 'Verify OTP' : 'Send OTP'}
            </button>
          </div>
        </>
      )}

      <div className='text-center'>
        <button className='text-sm text-blue-600 underline mb-2' onClick={() => setUseOtp(!useOtp)}>
          {useOtp ? 'Login with Password' : 'Login with OTP'}
        </button>
        <div>
          <span className='text-gray-700'>Don't have an account?</span>
          <button className='text-red-800 ml-2' onClick={openSignUp}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
