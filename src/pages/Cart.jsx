// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import EmptyCart from '../assets/Images/emptycart.png'
// import { FaTrashAlt } from 'react-icons/fa'
// import { useState } from 'react'
// import Modal from '../components/Modal'
// import ChangeAddress from '../components/ChangeAddress'
// import { removeFromCart,increaseQuantity,decreaseQuantity } from '../redux/cartSlice'
// import { useNavigate } from 'react-router-dom'
// import { useEffect } from 'react';
// import axios from 'axios';

// const Cart = () => {
//     const cart = useSelector(state => state.cart)
//     console.log('Cart Data:', cart);
//     const [address, setAddress] = useState('main street, 0012 ')
//     const [isModelOpen, setIsModelOpen] = useState(false)
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
    

// useEffect(() => {
//     const fetchCartData = async () => {
//         try {
//             const response = await axios.get("http://localhost:3000/api/cart");
//             dispatch({ type: "cart/setCart", payload: response.data });
//         } catch (error) {
//             console.error("Error fetching cart data:", error);
//         }
//     };
//     fetchCartData();
// }, [dispatch]);


    

//     return (
//         <div className='container mx-auto py-8 px-4 min-h-96 md:px-16 lg:px-24'>
//             {cart.products.length > 0 ? (
//                 <div>
//                     <h3 className='text-2xl font-semibold mb-4'>SHOPPING CART</h3>
//                     <div className='flex flex-col md:flex-row justify-between space-x-10 mt-8'>
//                         <div className='md:w-2/3'>
//                             <div className='flex justify-between border-b items-center text-xs mb-4 font-bold '>
//                                 <p>PRODUCTS</p>
//                                 <div className='flex space-x-12'>
//                                     <p>PRICE</p>
//                                     <p>QUANTITY</p>
//                                     <p>SUBTOTAL</p>
//                                     <p>REMOVE</p>
//                                 </div>
//                             </div>  
//                             <div>
//                                 {cart.products.map((product) => (
//                                     <div key={product.id} className='flex justify-between items-center border-b p-3 '>
//                                         <div className='md:flex items-center space-x-4'>
//                                             {console.log("product Image",product.image)}
//                                             <img src={product.image} alt="" 
//                                             className='w-16 h-16 object-contain rounded' />
//                                             <div className='flex-1 ml-4'>
//                                                 <h3 className='text-lg font-semobold'>{product.name}</h3>
//                                             </div>
//                                         </div>
//                                         <div className='flex space-x-12 items-center'>
//                                             <p>${product.price}</p>
//                                         </div>

//                                         <div className='flex items-center justify-center border'>
//                                             <button className='text-xl font-bold  px-1.5 border-r'
//                                             onClick={()=>dispatch(decreaseQuantity(product.id))}>-</button>

//                                             <p className=' px-2'>{product.quantity}</p>

//                                             <button className='text-xl px-1 border-1'
//                                             onClick={()=>dispatch(increaseQuantity(product.id))}>+</button>
//                                         </div>

//                                         <div >
//                                             <p >${(product.quantity * product.price).toFixed(2)}</p>
//                                         </div>
//                                         <div className=''>
//                                             <button className='text-red-500 hover:text-red-700'
//                                             onClick={()=>dispatch(removeFromCart(product.id))} >
//                                                 <FaTrashAlt />
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}                             
//                             </div>
//                         </div>


//                         <div className='md:w-1/3 bg-white p-6 rounded-md shadow-md border'>
//                             <h3 className='text-sm font-semibold mb-5'>CART TOTAL</h3>
//                             <div className='flex justify-between mb-5 border-b pb-1'>
//                                 <span className='text-sm'>Total Items:</span>
//                                 <span>{cart.totalQuantity}</span>
//                             </div>
//                             <div className='mb-4 border-b pb-2'>
//                                 <p>Shipping:</p>
//                                 <p className='ml-2 '>Shipping to:
//                                 <span className='text-xs font-bold'> { address}</span></p>
//                                 <button className='text-blue-500 hover:underline mt-1 ml-2' 
//                                 onClick={()=> setIsModelOpen(true)    
//                                 }>Change Address</button>
//                             </div>
//                             <div className='flex justify-between mb-4'>
//                                 <span>Total Price:</span>
//                                 <span>${cart.totalPrice}</span>
//                             </div>
//                             <button className='w-full bg-red-600 text-white py-2 hover:bg-red-800'
//                             onClick={() => navigate('/checkout')}
//                             >
//                             Proceed to checkout</button>
//                         </div>
//                     </div>
//                     <Modal isModelOpen={isModelOpen}
//                             setIsModelOpen={setIsModelOpen}>
//                                 <ChangeAddress setAddress={setAddress}  setIsModelOpen={setIsModelOpen}/>

//                             </Modal>
//                 </div>
//             ) : (
//                 <div className='flex flex-col items-center justify-center h-full'>
//                     <img src={EmptyCart} alt="Empty Cart" className='h-96' />
//                     <h2 className='text-2xl font-semibold text-gray-500'>Your cart is empty</h2>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Cart




import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyCart from '../assets/Images/emptycart.png'
import { FaTrashAlt } from 'react-icons/fa'
import { useState } from 'react'
import Modal from '../components/Modal'
import ChangeAddress from '../components/ChangeAddress'
import { removeFromCart,increaseQuantity,decreaseQuantity } from '../redux/cartSlice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
   
    const cart = useSelector(state => state.cart)
    console.log("current cart items:",cart)
    const [address, setAddress] = useState('main street, 0012 ')
    const [isModelOpen, setIsModelOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    return (
        <div className='container mx-auto py-8 px-4 min-h-96 md:px-16 lg:px-24'>
            {cart.products.length > 0 ? (
                <div>
                    <h3 className='text-2xl font-semibold mb-4'>SHOPPING CART</h3>
                    <div className='flex flex-col md:flex-row justify-between space-x-10 mt-8'>
                        <div className='md:w-2/3'>
                            <div className='flex justify-between border-b items-center text-xs mb-4 font-bold '>
                                <p>PRODUCTS</p>
                                <div className='flex space-x-12'>
                                    <p>PRICE</p>
                                    <p>QUANTITY</p>
                                    <p>SUBTOTAL</p>
                                    <p>REMOVE</p>
                                </div>
                            </div>  
                            <div>
                                {cart.products.map((product) => (
                                    <div key={product.id} className='flex justify-between items-center border-b p-3 '>
                                        <div className='md:flex items-center space-x-4'>
                                            <img src={product.image} alt="" 
                                            className='w-16 h-16 object-contain rounded' />
                                            <div className='flex-1 ml-4'>
                                                <h3 className='text-lg font-semobold'>{product.name}</h3>
                                            </div>
                                        </div>
                                        <div className='flex space-x-12 items-center'>
                                            <p>${product.price}</p>
                                        </div>

                                        <div className='flex items-center justify-center border'>
                                            <button className='text-xl font-bold  px-1.5 border-r'
                                            onClick={()=>dispatch(decreaseQuantity(product.id))}>-</button>

                                            <p className=' px-2'>{product.quantity}</p>

                                            <button className='text-xl px-1 border-1'
                                            onClick={()=>dispatch(increaseQuantity(product.id))}>+</button>
                                        </div>

                                        <div >
                                            <p >${(product.quantity * product.price).toFixed(2)}</p>
                                        </div>
                                        <div className=''>
                                            <button className='text-red-500 hover:text-red-700'
                                            onClick={()=>dispatch(removeFromCart(product.id))} >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </div>
                                ))}                             
                            </div>
                        </div>


                        <div className='md:w-1/3 bg-white p-6 rounded-md shadow-md border'>
                            <h3 className='text-sm font-semibold mb-5'>CART TOTAL</h3>
                            <div className='flex justify-between mb-5 border-b pb-1'>
                                <span className='text-sm'>Total Items:</span>
                                <span>{cart.totalQuantity}</span>
                            </div>
                            <div className='mb-4 border-b pb-2'>
                                <p>Shipping:</p>
                                <p className='ml-2 '>Shipping to:
                                <span className='text-xs font-bold'> { address}</span></p>
                                <button className='text-blue-500 hover:underline mt-1 ml-2' 
                                onClick={()=> setIsModelOpen(true)    
                                }>Change Address</button>
                            </div>
                            <div className='flex justify-between mb-4'>
                                <span>Total Price:</span>
                                <span>${cart.totalPrice}</span>
                            </div>
                            <button className='w-full bg-red-600 text-white py-2 hover:bg-red-800'
                            onClick={() => navigate('/checkout')}
                            >
                            Proceed to checkout</button>
                        </div>
                    </div>
                    <Modal isModelOpen={isModelOpen}
                            setIsModelOpen={setIsModelOpen}>
                                <ChangeAddress setAddress={setAddress}  setIsModelOpen={setIsModelOpen}/>

                            </Modal>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center h-full'>
                    <img src={EmptyCart} alt="Empty Cart" className='h-96' />
                    <h2 className='text-2xl font-semibold text-gray-500'>Your cart is empty</h2>
                </div>
            )}
        </div>
    )
}

export default Cart