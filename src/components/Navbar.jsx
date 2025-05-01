import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importing hooks from Redux
import { Link } from 'react-router-dom'; // Importing Link for navigation
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'; // Importing icons
import { setSearchTerm } from '../redux/productSlice'; // Redux action to set search term
import Modal from './Modal'; // Modal component
import Login from './Login'; // Login component
import Register from './Register'; // Register component
import { useNavigate } from 'react-router-dom'; // For programmatic navigation

const Navbar = () => {
  const [isModelOpen, setIsModelOpen] = useState(false); // State to manage modal visibility
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [search, setSearch] = useState(''); // State for search input
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if the user is logged in
  const [username, setUsername] = useState(localStorage.getItem('userName') || ''); // Get username from localStorage or default to empty string

  const dispatch = useDispatch(); // Initialize Redux dispatch
  const navigate = useNavigate(); // Initialize navigate for routing

  // Search handling logic
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(search)); // Dispatch search term to Redux
    navigate('/filter-data'); // Redirect to the filtered data page
  };

  // Open login modal
  const openLogin = () => {
    setIsLogin(true); 
    setIsModelOpen(true);
  };

  // Open signup modal
  const openSignUp = () => {
    setIsLogin(false); 
    setIsModelOpen(true);
  };

  // Handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Set loggedIn state to false
    setUsername(''); // Clear username state
    localStorage.removeItem('userEmail'); // Remove username from localStorage
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  const products = useSelector((state) => state.cart.products); // Get products from Redux state

  // Effect to check if the user is logged in based on the presence of a token
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true); // If token exists, set loggedIn state to true
      setUsername(localStorage.getItem('userName') || ''); // Update username from localStorage
    }
  }, [isLoggedIn]); // Runs when isLoggedIn state changes

  return (
    <nav className='bg-white shadow-md'>
      <div className='container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center'>
        <div className='text-lg font-bold'>
          <Link to="/">e-SHOP</Link> {/* Logo link */}
        </div>
        
        <div className='relative flex-1 mx-4'>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder='Search Product'
              className='w-full border py-2 px-4'
              onChange={(e) => setSearch(e.target.value)} // Update search state
            />
            <FaSearch className='absolute top-3 right-3 text-red-500' /> {/* Search icon */}
          </form>
        </div>

        <div className='flex items-center space-x-4'>
          <Link to="/cart" className='relative'>
            <FaShoppingCart className='text-lg'/>
            {products.length > 0 && (
              <span className='absolute top-0 text-xs w-4 left-3 bg-red-600 rounded-full flex justify-center items-center text-white'>
                {products.length} {/* Cart item count */}
              </span>
            )}
          </Link>

          {/* Conditional rendering for login/register or username and logout */}
          {!isLoggedIn ? (
            <>
              <button 
                className="hidden md:inline-block px-4 py-1 border border-gray-400 text-gray-500 rounded-md hover:text-red-600 hover:border-red-600 transition-all"
                onClick={openLogin} // Open login modal
              >
                Login
              </button>

              <button 
                className="hidden md:inline-block ml-2 px-4 py-1 border border-gray-400 text-gray-500 rounded-md hover:text-blue-600 hover:border-blue-600 transition-all"
                onClick={openSignUp} // Open signup modal
              >
                Register
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              {/* Show greeting message and username if logged in */}
              <span className="text-sm font-semibold">Heyyy, <span className="text-red-600">{username}</span></span> 
              {/* Logout button styled like login button */}
              <button 
                className="hidden md:inline-block px-4 py-1 border border-gray-400 text-gray-500 rounded-md hover:text-red-600 hover:border-red-600 transition-all"
                onClick={handleLogout} // Logout functionality
              >
                Logout
              </button>
            </div>
          )}

          <button className='block md:hidden'>
            <FaUser /> {/* User icon for mobile view */}
          </button>
        </div>
      </div>

      {/* Navbar links */}
      <div className='flex items-center justify-center space-x-10 py-4 text-sm font-bold'>
        <Link to="/" className='hover:underline'>Home</Link>
        <Link to="/shop" className='hover:underline'>Shop</Link>
        <Link to="/contact" className='hover:underline'>Contact</Link>
        <Link to="/about" className='hover:underline'>About</Link>
      </div>

      {/* Modal for Login/SignUp */}
      <Modal isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
        {isLogin ? (
          <Login openSignUp={openSignUp} setIsModelOpen={setIsModelOpen} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Register openLogin={openLogin} setIsModelOpen={setIsModelOpen} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Modal>
    </nav>
  );
};

export default Navbar;
