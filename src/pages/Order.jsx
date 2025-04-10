// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Order = ({ order }) => {
//   const [status, setStatus] = useState(order.progress);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const getStatusMessage = (status) => {
//     switch (status) {
//       case 'Pending':
//         return 'Your order is pending. We are preparing it for dispatch.';
//       case 'Dispatch':
//         return 'Your order has been dispatched and is on its way!';
//       case 'Shipped':
//         return 'Your order has been shipped and is in transit!';
//       case 'Delivered':
//         return 'Your order has been delivered! We hope you enjoy your purchase.';
//       default:
//         return 'Order status is unavailable. Please contact customer support.';
//     }
//   };

//   const handleChangeStatus = (newStatus) => {
//     setLoading(true);
//     setError(null);
//     setTimeout(() => {
//       setStatus(newStatus);
//       setLoading(false);
//     }, 1000);
//   };

//   const handleCheckStatus = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`http://localhost:3000/api/order/${order._id}/status`);
//       setStatus(response.data.status); // assuming backend returns { status: 'Delivered' }
//     } catch (err) {
//       setError('Failed to fetch status');
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   useEffect(() => {
//     localStorage.setItem('orderItems', JSON.stringify(order.products));
//   }, [order]);

//   return (
//     <div className="container mx-auto p-6 md:p-12">
//       <div className="bg-white rounded-lg shadow-lg p-8">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Thanks for Shopping with Us!</h2>
//         <p className="text-center text-gray-600 mb-6">Your order has been successfully placed.</p>

//         <div className="border-b pb-4 mb-6">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-2">Order Status</h3>
//           <p className={`text-lg font-bold ${status === 'Pending' || status === 'Delivered' ? 'text-red-600' : 'text-gray-700'} mb-3`}>
//             Status: <span className="font-semibold">{status}</span>
//           </p>
//           <p className="text-md border border-gray-300 p-2 rounded-lg">{getStatusMessage(status)}</p>

//           <button
//             onClick={handleCheckStatus}
//             className="bg-green-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-700 transition"
//             disabled={loading}
//           >
//             Click here to check order status!
//           </button>
//         </div>

//         {status === 'Pending' && (
//           <div className="mt-4">
//             <select
//               value={status}
//               onChange={(e) => handleChangeStatus(e.target.value)}
//               className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
//               disabled={loading}
//             >
//               <option value="Pending">Pending</option>
//               <option value="Dispatch">Dispatch</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//         )}

//         {loading && <p className="text-center text-blue-600 mt-2">Updating status...</p>}
//         {error && <p className="text-center text-red-600 mt-2">{error}</p>}

//         <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
//           <p className="text-lg text-gray-700 mb-4">Order Number: <span className="font-semibold">{order.orderNumber}</span></p>

//           <div className="mb-6">
//             <h4 className="text-lg font-semibold text-gray-800 mb-2">Shipping Information</h4>
//             <p className="text-gray-700">{order.shippingInformation?.address}</p>
//             <p className="text-gray-700">{order.shippingInformation?.city}</p>
//             <p className="text-gray-700">{order.shippingInformation?.zip}</p>
//           </div>

//           <div className="mb-6">
//             <h4 className="text-lg font-semibold text-gray-800 mb-4">Items Ordered</h4>
//             {order.products?.map((product, index) => (
//               <div key={index} className="flex justify-between items-center mb-6">
//                 <div className="flex items-center">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-20 h-20 object-contain rounded-lg mr-6 transition-all transform hover:scale-105"
//                   />
//                   <p className="text-gray-800 text-lg">{product.name} x {product.quantity || 1}</p>
//                 </div>
//                 <p className="text-lg text-gray-700 font-semibold">${(product.price * (product.quantity || 1)).toFixed(2)}</p>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-between items-center mt-4">
//             <span className="text-xl text-gray-800 font-semibold">Total Price:</span>
//             <span className="text-2xl font-bold text-gray-800">${order.totalPrice?.toFixed(2)}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Order;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Order = ({ order }) => {
  const [status, setStatus] = useState(order.progress);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getStatusMessage = (status) => {
    switch (status) {
      case 'Pending':
        return 'Your order is pending. We are preparing it for dispatch.';
      case 'Dispatch':
        return 'Your order has been dispatched and is on its way!';
      case 'Shipped':
        return 'Your order has been shipped and is in transit!';
      case 'Delivered':
        return 'Your order has been delivered! We hope you enjoy your purchase.';
      default:
        return 'Order status is unavailable. Please contact customer support.';
    }
  };

  useEffect(() => {
    localStorage.setItem('orderItems', JSON.stringify(order.products));
  }, [order]);

  // Automatically check status from backend every 5 seconds
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/order/${order._id}/status`);
        setStatus(response.data.status);
      } catch (err) {
        setError('Failed to fetch status');
      }
    };

    fetchStatus(); // initial fetch
    const interval = setInterval(fetchStatus, 5000); // repeat every 5s
    return () => clearInterval(interval); // clean up
  }, [order._id]);

  return (
    <div className="container mx-auto p-6 md:p-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Thanks for Shopping with Us!</h2>
        <p className="text-center text-gray-600 mb-6">Your order has been successfully placed.</p>

        <div className="border-b pb-4 mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Order Status</h3>
          <p className={`text-lg font-bold ${status === 'Pending' || status === 'Delivered' ? 'text-red-600' : 'text-gray-700'} mb-3`}>
            Status: <span className="font-semibold">{status}</span>
          </p>
          <p className="text-md border border-gray-300 p-2 rounded-lg">{getStatusMessage(status)}</p>
        </div>

        {error && <p className="text-center text-red-600 mt-2">{error}</p>}

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
          <p className="text-lg text-gray-700 mb-4">
            Order Number: <span className="font-semibold">{order.orderNumber}</span>
          </p>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Shipping Information</h4>
            <p className="text-gray-700">{order.shippingInformation?.address}</p>
            <p className="text-gray-700">{order.shippingInformation?.city}</p>
            <p className="text-gray-700">{order.shippingInformation?.zip}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Items Ordered</h4>
            {order.products?.map((product, index) => (
              <div key={index} className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-contain rounded-lg mr-6 transition-all transform hover:scale-105"
                  />
                  <p className="text-gray-800 text-lg">{product.name} x {product.quantity || 1}</p>
                </div>
                <p className="text-lg text-gray-700 font-semibold">
                  ${(product.price * (product.quantity || 1)).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-xl text-gray-800 font-semibold">Total Price:</span>
            <span className="text-2xl font-bold text-gray-800">${order.totalPrice?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
