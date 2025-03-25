import React from 'react'
import { useNavigate } from 'react-router-dom'

const Order = ({ order }) => {
  if (!order) return <p>No order details available.</p>

  const navigate = useNavigate()

  return (
    <div className='container bg-gray-200 mx-auto py-8 px-4 md:px-16 lg:px-24'>
      <h2 className='text-2xl font-semibold mb-4'>Thanks for Shopping with Us!</h2>
      <p>Order successfully placed! You will receive an email shortly.</p>
      <div className='mt-6 border rounded-lg bg-gray-100 p-4'>
        <h3 className='text-lg font-semibold mb-2'>Order Summary</h3>
        <p>Order Number: {order.orderNumber}</p>
        <div className='mt-4'>
          <h2 className='text-md  mb-2 font-semibold'>Shipping Information</h2>
          <p>{order.shippingInformation.address}</p>
          <p>{order.shippingInformation.city}</p>
          <p>{order.shippingInformation.zip}</p>
        </div>
        <div className='mt-4'>
          <h4 className='text-md font-semibold mb-2'>Items Ordered</h4>
          {order.products.map((product) => (
            <div key={product.id} className='flex justify-between items-center mt-2'>
              <p>{product.name} x {product.quantity}</p>
              <p>${(product.price * product.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className='mt-4 justify-between mb-2'>
    <span >Total Price:</span>
    <span className='font-semibold mb-2'>${order.totalPrice.toFixed(2)}</span>
    </div>
    <div className='flex space-x-4'>
    <button className='bg-green-500 text-white py-2 px-4 hover:bg-green-600'
    
    >
      Track Your Order!
      </button>
    <button className='bg-red-500 text-white py-2 px-4 hover:bg-red-600'
    onClick={() => navigate('/')}
    >
      Continue Shopping
      </button>
</div>


      </div>
    </div>
  )
}

export default Order
