// import React from 'react'
// import { Link } from 'react-router-dom'
// import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'
// // import Home from '../pages/Home'
// import { useSelector,useDispatch } from 'react-redux'
// import Modal from './Modal'
// import Login from './Login'     
// import Register from './Register'
// import { useState } from 'react'
// import { setSearchTerm } from '../redux/productSlice'
// import { useNavigate } from 'react-router-dom'
// import FilterData from '../pages/FilterData'


// const Navbar = () => {
//   const [isModelOpen, setIsModelOpen] = useState(false)
//   const [isLogin , setIsLogin] = useState(true)
//   const [search, setSearch] = useState()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const handleSearch = (e) => {
//     e.preventDefault()  
//     dispatch(setSearchTerm(search))
//     navigate('/filter-data')
//   }

//   const openSignUp = () => {
//     setIsLogin(false) 
//     setIsModelOpen(true)
//   }

//   const openLogin = () => {
//     setIsLogin(true) 
//     setIsModelOpen(true)

//   }
//   const products = useSelector(state=> state.cart.products)
//   return (
//     <nav className='bg-white shadow-md'>
//       <div className='container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center'>
//         <div className='text-lg font-bold'>
//           <Link to="/">e-SHOP</Link>
//         </div>
        
//         <div className='relative flex-1 mx-4'>
//           <form onSubmit={handleSearch}>
//             <input type="text" placeholder='Search Product' className='w-full border py-2 px-4' onChange={(e)=>setSearch(e.target.value)}/>
//             <FaSearch className='absolute top-3 right-3 text-red-500' />
//           </form>
//         </div>

//         {/* Moved this div inside the main flex container */}
//         <div className='flex items-center space-x-4'>
//           <Link to="/cart" className='relative'>
//             <FaShoppingCart  className='text-lg'/>
//             {products.length > 0 && (
//             <span className='absolute top-0 text-xs w-4 left-3 bg-red-600 rounded-full flex justify-center items-center text-white'>      {products.length}
//             </span>
//           )}


//             {/* {products.length > 0 ? products.length : <></>} */}
//           </Link>
//           <button className='hidden md:block'
//           onClick={()=>{
//             setIsModelOpen(true)
//             // setIsLogin(false)
//           }}
//           >
//             Login | Register
//           </button>
//           <button className='block md:hidden'>
//             <FaUser />
//           </button>
//         </div>
//       </div>
//       <div className='flex items-center justify-center space-x-10 py-4 text-sm font-bold'>
//         <Link to="/" className='hover:underline'>
//             Home
//         </Link>
//         <Link to="/shop" className='hover:underline'>
//             Shop
//         </Link>
//         <Link to="/" className='hover:underline'>
//             Contact
//         </Link>
//         <Link to="/"  className='hover:underline'>
//             About
//         </Link>
//       </div>
//       <Modal isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
//           {isLogin ? <Login openSignUp={openSignUp} /> : <Register  openLogin={openLogin}/>}
//       </Modal>
//     </nav>
//   )
// }

// export default Navbar



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import Modal from './Modal';
import Login from './Login';     
import Register from './Register';
import { setSearchTerm } from '../redux/productSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();  
    dispatch(setSearchTerm(search));
    navigate('/filter-data');
  };

  const openLogin = () => {
    console.log("Opening Login Page"); 
    setIsLogin(true); 
    setIsModelOpen(true);
  };
  
  const openSignUp = () => {
    console.log("Opening Register Page");
    setIsLogin(false); 
    setIsModelOpen(true);
  };
  
  

  const products = useSelector((state) => state.cart.products);
  console.log("Is Login Page?:", isLogin);
  return (
    <nav className='bg-white shadow-md'>
      <div className='container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center'>
        <div className='text-lg font-bold'>
          <Link to="/">e-SHOP</Link>
        </div>
        
        <div className='relative flex-1 mx-4'>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder='Search Product'
              className='w-full border py-2 px-4'
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className='absolute top-3 right-3 text-red-500' />
          </form>
        </div>

        <div className='flex items-center space-x-4'>
          <Link to="/cart" className='relative'>
            <FaShoppingCart className='text-lg'/>
            {products.length > 0 && (
              <span className='absolute top-0 text-xs w-4 left-3 bg-red-600 rounded-full flex justify-center items-center text-white'>
                {products.length}
              </span>
            )}
          </Link>
          <button 
                className="hidden md:inline-block px-4 py-1 border border-gray-400 text-gray-500 rounded-md hover:text-red-600 hover:border-red-600 transition-all"
                onClick={openLogin}
              >
                Login
              </button>

              <button 
                className="hidden md:inline-block ml-2 px-4 py-1 border border-gray-400 text-gray-500 rounded-md hover:text-blue-600 hover:border-blue-600 transition-all"
                onClick={openSignUp}
              >
                Register
          </button>




          <button className='block md:hidden'>
            <FaUser />
          </button>
        </div>
      </div>
      <div className='flex items-center justify-center space-x-10 py-4 text-sm font-bold'>
        <Link to="/" className='hover:underline'>Home</Link>
        <Link to="/shop" className='hover:underline'>Shop</Link>
        <Link to="/contact" className='hover:underline'>Contact</Link>
        <Link to="/about" className='hover:underline'>About</Link>
      </div>
      <Modal isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
  {isLogin ? (
    <Login openSignUp={openSignUp} setIsModelOpen={setIsModelOpen} />
  ) : (
    <Register openLogin={openLogin} setIsModelOpen={setIsModelOpen} />
  )}
</Modal>



    </nav>
  );
};

export default Navbar;
