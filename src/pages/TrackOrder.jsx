import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; // If you're using Redux

const TrackOrder = () => {
  const { orderNumber } = useParams(); // Get the order number from the URL
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get the cart from the Redux store
  const cart = useSelector((state) => state.cart); // Assuming cart is stored in Redux

  // Example of how you might fetch the order data based on the order number
  useEffect(() => {
    const fetchOrderDetails = async () => {
      // Simulating an API call with a static object or fetch data based on orderNumber
      const orderData = {
        orderNumber: orderNumber,
        status: 'Shipped',
        shippingDetails: {
          trackingNumber: '12345',
          estimatedDelivery: '2025-03-30',
        },
        items: cart.products.map((product) => ({
          name: product.name,
          quantity: product.quantity,
          price: product.price,
        })),
      };

      setOrderDetails(orderData);
      setLoading(false);
    };

    fetchOrderDetails();
  }, [orderNumber, cart]); // Ensure cart is updated when the state changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderDetails) {
    return <div>No order details found for this order number.</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-16 lg:px-24 bg-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Track Your Order</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Order Number: {orderDetails.orderNumber}</h3>
        <p><strong>Status:</strong> {orderDetails.status}</p>

        <div className="mt-4">
          <h4 className="text-md font-semibold mb-2">Shipping Details</h4>
          <p><strong>Tracking Number:</strong> {orderDetails.shippingDetails.trackingNumber}</p>
          <p><strong>Estimated Delivery:</strong> {orderDetails.shippingDetails.estimatedDelivery}</p>
        </div>

        <div className="mt-4">
          <h4 className="text-md font-semibold mb-2">Items in Your Order</h4>
          {orderDetails.items.map((product, index) => (
            <div key={index} className="flex justify-between items-center mt-2">
              <p>{product.name} x {product.quantity}</p>
              <p>${(product.price * product.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
