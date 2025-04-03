// import React from 'react'
// import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
// import { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom' // Import useNavigate
// import axios from 'axios'

// const Checkout = ({ setOrder }) => { // Ensure setOrder is passed as a prop
//     const [billingToggle, setBillingToggle] = useState(true)
//     const [shippingToggle, setShippingToggle] = useState(false)
//     const [paymentToggle, setPaymentToggle] = useState(false)

//     const [paymentMethod, setPaymentMethod] = useState('cod') //cod-Cash On Delivery
//     const [shippingInfo, setShippingInfo] = useState({
//         address : '',
//         city    : '',
//         zip     : ''
//     })
    
//     const cart = useSelector((state) => state.cart)
//     const navigate = useNavigate()

//     // const handleOrder = () =>{
//     //     const newOrder ={
//     //         products: cart.products,
//     //         orderNumber:"122334",
//     //         shippingInformation: shippingInfo,
//     //         totalPrice: cart.totalPrice,    
//     //     }
//     //     console.log("Order Data:", newOrder); // Log the order data
//     //     setOrder(newOrder)
//     //     navigate('/order-confirmation')
//     // }


// const handleOrder = async () => {
//     const orderData = {
//         orderNumber: "122334",
//         shippingInformation: shippingInfo,
//         totalPrice: cart.totalPrice,
//         paymentMethod,
//         products: cart.products.map(product => product.id), // Send only IDs
//     };

//     console.log("Sending Order Data:", orderData);

//     try {
//         const response = await axios.post("http://localhost:3000/api/order", orderData, {
//             headers: { "Content-Type": "application/json" },
//         });

//         console.log("Order Created:", response.data);

//         // Ensure response exists before setting state
//         if (response.data?.order) {
//             setOrder({ ...response.data.order, products: cart.products });
//             navigate("/order-confirmation");
//         } else {
//             console.error("Invalid response format:", response.data);
//         }

//     } catch (error) {
//         console.error("Error creating order:", error.response?.data || error.message);
//     }
// };



//   return (
//     <div className='container mx-auto py-8 px-4 min-h-96 md:px-16 lg:px-24'>
//             <h3 className='text-2xl font-semibold mb-4'>CHECKOUT</h3>
//             <div className='flex flex-col md:flex-row justify-between space-x-10 mt-8'>
//                 <div className='md:w-2/3'>
//                     {/* Billing */} 
//                     <div className='border p-2 mb-6 '>
//                         <div className='flex justify-between items-center'
//                         onClick={()=>setBillingToggle(!billingToggle)}>
//                             <h3 className='text-lg font-semibold mb-2'>Billing Information</h3>
//                             {billingToggle ? <FaAngleDown  /> : <FaAngleUp  />}
//                         </div>

//                         <div className={`space-y-4 ${billingToggle ? "" : "hidden"}`}>
//                             <div>
//                                 <label className='block text-gray-700'>Name</label>
//                                 <input type="text"
//                                 name="name"
//                                 placeholder='Enter Name' 
//                                 className='w-full px-3 py-2 border mb-2'/>
//                             </div>
//                             <div>
//                                 <label className='block text-gray-700'>Email</label>
//                                 <input type="email"
//                                  name="email"
//                                  placeholder='Enter E-Mail' 
//                                  className='w-full px-3 py-2 border mb-2' />
//                             </div>
//                             <div>
//                                 <label className='block text-gray-700'>Phone</label>
//                                 <input type="number"
//                                  name="phone"
//                                  placeholder='Enter Phone Number' 
//                                  className='w-full px-3 py-2 border mb-2' />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Shipping */}
//                     <div className='border p-2 mb-6 '>
//                         <div className='flex justify-between items-center'
//                         onClick={()=>setShippingToggle(!shippingToggle)}>
//                             <h3 className='text-lg font-semibold mb-2'>Shipping Information</h3>
//                             {shippingToggle ? <FaAngleDown  /> : <FaAngleUp  />}
//                         </div>

//                         <div className={`space-y-4 ${shippingToggle ? "" : "hidden"}`}>
//                             <div>
//                                 <label className='block text-gray-700'>Address</label>
//                                 <input type="text"
//                                 name="address"
//                                 placeholder='Enter Address' 
//                                 className='w-full px-3 py-2 border mb-2'
//                                 onChange={(e)=>setShippingInfo({...shippingInfo, address: e.target.value})}
//                                 />
//                             </div>
//                             <div>
//                                 <label className='block text-gray-700'>City</label>
//                                 <input type="text"
//                                  name="city"
//                                  placeholder='Enter City' 
//                                  className='w-full px-3 py-2 border mb-2'
//                                  onChange={(e)=>setShippingInfo({...shippingInfo, city: e.target.value})}
//                                  />
//                             </div>
//                             <div>
//                                 <label className='block text-gray-700'>Zip Code</label>
//                                 <input type="number"
//                                  name="zip"
//                                  placeholder='Enter Zip Code' 
//                                  className='w-full px-3 py-2 border mb-2' 
//                                  onChange={(e)=>setShippingInfo({...shippingInfo, zip: e.target.value})}
//                                  />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Payment Method */}
//                     <div className='border p-2 mb-6 '>
//                         <div className='flex justify-between items-center'
//                         onClick={()=>setPaymentToggle(!paymentToggle)}>
//                             <h3 className='text-lg font-semibold mb-2'>Payment Method</h3>
//                             {paymentToggle ? <FaAngleDown  /> : <FaAngleUp  />}
//                         </div>

//                         <div className={`space-y-4 ${paymentToggle ? "" : "hidden"}`}>
//                             <div className='flex items-center mb-2'>
//                                 <input type="radio"
//                                 name="payment"
//                                 checked={paymentMethod === "cod"} 
//                                 onChange={()=> setPaymentMethod("cod")}/>
//                                 <label className='block text-gray-700 ml-2'>Cash On Delivery</label>
//                             </div>

//                             <div className='flex items-center mb-2'>
//                                 <input type="radio"
//                                 name="payment"
//                                 checked={paymentMethod === "dc"} 
//                                 onChange={()=> setPaymentMethod("dc")}/>
//                                 <label className='block text-gray-700 ml-2'>Debit Card</label>
//                             </div>
//                             {paymentMethod === "dc" && (
//                                 <div className='bg-gray-200 p-4 rounded-md mb-4'>
//                                     <h3 className='text-xl font-semibold mb-4'>Debit Card Infromation</h3>
//                                     <div className='mb-4'>
//                                         <label className='block text-gray-700 font-semibold mb-2'>Card Number</label>
//                                         <input type="number"
//                                         name="card"
//                                         placeholder='Enter Card Number' 
//                                         className='w-full rounded p-2 border mb-2'
//                                         required
//                                         />
//                                     </div>

//                                     <div className='mb-4'>
//                                         <label className='block text-gray-700 font-semibold mb-2'>Card Holder Name</label>
//                                         <input type="text"
//                                         name="card"
//                                         placeholder='Enter Name' 
//                                         className='w-full rounded p-2 border mb-2'
//                                         required
//                                         />
//                                     </div>

//                                     <div className='flex justify-between mb-4'>
//                                         <div className='w-1/2 mr-2'>
//                                             <label className='block text-gray-700 font-semibold mb-2'>Expiry Date</label>
//                                             <input type="text"
//                                             placeholder='MM/YY'
//                                             className='w-full rounded p-2 border mb-2'
//                                             required
//                                             />
//                                         </div>

//                                         <div className='w-1/2 ml-2'>
//                                             <label className='block text-gray-700 font-semibold mb-2'>CVV</label>
//                                             <input type="text"
//                                             placeholder='CVV'
//                                             className='w-full rounded p-2 border mb-2' 
//                                             required
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div> 

//                 {/* Order Summary */}   
//                 <div className='md:w-1/3 bg-white p-6 rounded-md shadow-md border'>
//                         <h3>Order Summery</h3>
//                         <div>
//                             {cart.products.map(product => (
//                                 <div key={product.id} className='flex justify-between items-center border-b p-3 '>
//                                     <div className='md:flex items-center space-x-4'>
//                                         <img src={product.image} alt="" 
//                                         className='w-16 h-16 object-contain rounded' />
//                                         <div className='flex-1 ml-4'>
//                                             <h4 className='text-lg font-semibold'>{product.name}</h4>
//                                             <p className='text-gray-600'>
//                                                 ${product.price} x {product.quantity}
//                                             </p>
//                                         </div>
//                                     </div>
//                                     <div className='text-gray-800'>
//                                         ${(product.price * product.quantity).toFixed(2)}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className='mt-4 border-t pt-4'>
//                             <div className='flex justify-between'>
//                                 <span>Total Price:</span>
//                                 <span className='font-semibold'>${cart.totalPrice.toFixed(2)}</span>
//                             </div>
//                         </div>
//                         <button className='w-full bg-red-600 text-white py-2 mt-6 hover:bg-red-800'
//                         onClick={handleOrder}
//                         >
//                         Place Order</button>
//                 </div>
//             </div>
//     </div>
//   )
// }

// export default Checkout




import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({ setOrder }) => {
    const [billingToggle, setBillingToggle] = useState(true);
    const [shippingToggle, setShippingToggle] = useState(false);
    const [paymentToggle, setPaymentToggle] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        city: '',
        zip: ''
    });

    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const handleOrder = async () => {
        const orderData = {
            orderNumber: "122334",
            shippingInformation: shippingInfo,
            totalPrice: cart.totalPrice,
            paymentMethod,
            products: cart.products.map(product => product.id),
        };

        console.log("Sending Order Data:", orderData);

        try {
            const response = await axios.post("http://localhost:3000/api/order", orderData, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("Order Created:", response.data);

            if (response.data?.order) {
                setOrder({ ...response.data.order, products: cart.products });
                
                // Show success toast notification
                toast.success('Order Placed Successfully!', { autoClose: 2000 });

                // Redirect after toast
                setTimeout(() => navigate("/order-confirmation"), 2500);
            } else {
                console.error("Invalid response format:", response.data);
                toast.error('Something went wrong. Please try again.');
            }

        } catch (error) {
            console.error("Error creating order:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Failed to place order.');
        }
    };

    return (
        <div className='container mx-auto py-8 px-4 min-h-96 md:px-16 lg:px-24'>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <h3 className='text-2xl font-semibold mb-4'>CHECKOUT</h3>
            
            {/* Checkout Form */}
            <div className='flex flex-col md:flex-row justify-between space-x-10 mt-8'>
                <div className='md:w-2/3'>
                    {/* Billing Section */}
                    <div className='border p-2 mb-6'>
                        <div className='flex justify-between items-center' onClick={() => setBillingToggle(!billingToggle)}>
                            <h3 className='text-lg font-semibold mb-2'>Billing Information</h3>
                            {billingToggle ? <FaAngleDown /> : <FaAngleUp />}
                        </div>
                        <div className={`space-y-4 ${billingToggle ? "" : "hidden"}`}>
                            <div>
                                <label className='block text-gray-700'>Name</label>
                                <input type="text" name="name" placeholder='Enter Name' className='w-full px-3 py-2 border mb-2'/>
                            </div>
                            <div>
                                <label className='block text-gray-700'>Email</label>
                                <input type="email" name="email" placeholder='Enter E-Mail' className='w-full px-3 py-2 border mb-2' />
                            </div>
                            <div>
                                <label className='block text-gray-700'>Phone</label>
                                <input type="number" name="phone" placeholder='Enter Phone Number' className='w-full px-3 py-2 border mb-2' />
                            </div>
                        </div>
                    </div>

                    {/* Shipping Section */}
                    <div className='border p-2 mb-6'>
                        <div className='flex justify-between items-center' onClick={() => setShippingToggle(!shippingToggle)}>
                            <h3 className='text-lg font-semibold mb-2'>Shipping Information</h3>
                            {shippingToggle ? <FaAngleDown /> : <FaAngleUp />}
                        </div>
                        <div className={`space-y-4 ${shippingToggle ? "" : "hidden"}`}>
                            <div>
                                <label className='block text-gray-700'>Address</label>
                                <input type="text" name="address" placeholder='Enter Address' className='w-full px-3 py-2 border mb-2'
                                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}/>
                            </div>
                            <div>
                                <label className='block text-gray-700'>City</label>
                                <input type="text" name="city" placeholder='Enter City' className='w-full px-3 py-2 border mb-2'
                                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}/>
                            </div>
                            <div>
                                <label className='block text-gray-700'>Zip Code</label>
                                <input type="number" name="zip" placeholder='Enter Zip Code' className='w-full px-3 py-2 border mb-2'
                                    onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}/>
                            </div>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className='border p-2 mb-6'>
                        <div className='flex justify-between items-center' onClick={() => setPaymentToggle(!paymentToggle)}>
                            <h3 className='text-lg font-semibold mb-2'>Payment Method</h3>
                            {paymentToggle ? <FaAngleDown /> : <FaAngleUp />}
                        </div>
                        <div className={`space-y-4 ${paymentToggle ? "" : "hidden"}`}>
                            <div className='flex items-center mb-2'>
                                <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")}/>
                                <label className='block text-gray-700 ml-2'>Cash On Delivery</label>
                            </div>
                            <div className='flex items-center mb-2'>
                                <input type="radio" name="payment" checked={paymentMethod === "dc"} onChange={() => setPaymentMethod("dc")}/>
                                <label className='block text-gray-700 ml-2'>Debit Card</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary Section */}
                <div className='md:w-1/3 bg-white p-6 rounded-md shadow-md border'>
                    <h3>Order Summary</h3>
                    <div>
                        {cart.products.map(product => (
                            <div key={product.id} className='flex justify-between items-center border-b p-3'>
                                <div className='md:flex items-center space-x-4'>
                                    <img src={product.image} alt="" className='w-16 h-16 object-contain rounded' />
                                    <div className='flex-1 ml-4'>
                                        <h4 className='text-lg font-semibold'>{product.name}</h4>
                                        <p className='text-gray-600'>${product.price} x {product.quantity}</p>
                                    </div>
                                </div>
                                <div className='text-gray-800'>
                                    ${(product.price * product.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='mt-4 border-t pt-4'>
                        <div className='flex justify-between'>
                            <span>Total Price:</span>
                            <span className='font-semibold'>${cart.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <button className='w-full bg-red-600 text-white py-2 mt-6 hover:bg-red-800' onClick={handleOrder}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
