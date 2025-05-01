
// import { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UpdateValues = () => {
//   const [orders, setOrders] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [product, setProduct] = useState({
//     name: '',
//     price: '',
//     categories: '',
//     imageUrl: null,
//   });

//   const [activeSection, setActiveSection] = useState('orders');
//   const imageInputRef = useRef(null);

//   useEffect(() => {
//     axios.get('http://localhost:3000/api/order')
//       .then(res => setOrders(res.data))
//       .catch(err => console.error(err));

//     fetchProducts();
//   }, []);

//   const fetchProducts = () => {
//     axios
//       .get('http://localhost:3000/api/products')
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error('Error fetching products:', err));
//   };

//   const toggleStatus = (id) => {
//     axios
//       .patch(`http://localhost:3000/api/products/toggle/${id}`)
//       .then((res) => {
//         const updated = res.data.product;
//         setProducts((prev) =>
//           prev.map((p) => (p._id === id ? updated : p))
//         );
//         // Success message after successful toggle
//         toast.success(`Product ${updated.isActive ? 'activated' : 'deactivated'} successfully!`);
//       })
//       .catch((err) => {
//         console.error('Toggle failed:', err);
//         // Error message in case of failure
//         toast.error("Error toggling product status.");
//       });
//   };
  

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await axios.put(`http://localhost:3000/api/order/${orderId}/status`, { status: newStatus });
//       const updated = await axios.get('http://localhost:3000/api/order');
//       setOrders(updated.data);
//       toast.success("Order status updated successfully!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Error updating status.");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setProduct({ ...product, imageUrl: e.target.files[0] });
//   };

//   const handleProductSubmit = async (e) => {
//     e.preventDefault();

//     if (!product.imageUrl) {
//       toast.error("Please select an image for the product.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', product.name);
//     formData.append('price', product.price.replace('$', ''));
//     formData.append('categories', JSON.stringify(product.categories.split(',')));
//     formData.append('imageUrl', product.imageUrl);

//     try {
//       const response = await axios.post('http://localhost:3000/api/products/add', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       toast.success("Product added successfully!");
//       localStorage.setItem("productAdded", Date.now());
//       setProduct({ name: '', price: '', categories: '', imageUrl: null });
//       imageInputRef.current.value = null;
//       fetchProducts();
//     } catch (error) {
//       toast.error("Error adding product.");
//       console.error('Add product error:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-100 relative">
//       {/* Sidebar */}
//       <div className="w-64 bg-white p-6 shadow-md absolute h-full border-r border-gray-200">
//         <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Admin Panel</h2>
//         <ul className="space-y-4">
//           {['orders', 'add-product', 'show-product'].map((section) => (
//             <li key={section}>
//               <button
//                 onClick={() => setActiveSection(section)}
//                 className={`w-full px-4 py-2 text-left rounded-lg text-lg font-medium transition ${
//                   activeSection === section
//                     ? 'bg-gray-200 text-gray-900'
//                     : 'text-gray-600 hover:bg-gray-100'
//                 }`}
//               >
//                 {section.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="ml-64 w-full p-8">

// {/* ORDER SECTION */}

//       {activeSection === 'orders' && (
//   <div className="bg-white p-6 rounded-lg shadow-md">
//     <h2 className="text-3xl font-semibold text-gray-800 mb-4">Orders</h2>
//     <div className="overflow-x-auto">
//       <table className="min-w-full table-auto border border-gray-300 text-sm text-center">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-2 border">S.No</th> {/* Added S.No column */}
//             <th className="px-4 py-2 border">Order No</th>
//             <th className="px-4 py-2 border">Shipping</th>
//             <th className="px-4 py-2 border">Total</th>
//             <th className="px-4 py-2 border">Status</th>
//             <th className="px-4 py-2 border">Update</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order, index) => (
//             <tr key={order._id} className="hover:bg-gray-50">
//               <td className="px-4 py-2 border">{index + 1}</td> {/* Displaying serial number */}
//               <td className="px-4 py-2 border">{order.orderNumber}</td>
//               <td className="px-4 py-2 border">{order.shippingInformation?.address}</td>
//               <td className="px-4 py-2 border">${order.totalPrice}</td>
//               <td className="px-4 py-2 border">{order.status}</td>
//               <td className="px-4 py-2 border">
//                 <select
//                   value={order.status || "Pending"}
//                   onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                   className="border px-2 py-1 rounded-md"
//                 >
//                   <option>Pending</option>
//                   <option>Dispatch</option>
//                   <option>Delivered</option>
//                   <option>Shipped</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// )}
        

//         {activeSection === 'add-product' && (
//   <div className="bg-white p-6 rounded-lg shadow-md">
//     <h2 className="text-3xl font-semibold text-gray-800 mb-4">Add Product</h2>
//     <form onSubmit={handleProductSubmit} className="space-y-4">
//       <div className="grid md:grid-cols-2 gap-6">
//         <div>
//           <label className="block mb-1 font-medium">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={product.name}
//             onChange={handleInputChange}
//             className="w-full border px-3 py-2 rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Price</label>
//           <input
//             type="text"
//             name="price"
//             value={product.price}
//             onChange={handleInputChange}
//             className="w-full border px-3 py-2 rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Categories (comma-separated)</label>
//           <input
//             type="text"
//             name="categories"
//             value={product.categories}
//             onChange={handleInputChange}
//             className="w-full border px-3 py-2 rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Product Image</label>
//           <input
//             ref={imageInputRef}
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="w-full border px-3 py-2 rounded-md"
//             required
//           />
//         </div>
//       </div>
//       {/* Align button to the right */}
//       <div className="flex justify-end mt-4">
//         <button
//           type="submit"
//           className="px-6 py-2 border  border-gray-600 translate-x-3 transition-all hover:bg-gray-600 hover:text-white text-black rounded-lg font-semibold shadow-md"
//         >
//           Add Product
//         </button>
//       </div>
//     </form>
//   </div>
// )}


//         {activeSection === 'show-product' && (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-3xl font-semibold text-gray-800 mb-4">All Products</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full table-auto border border-gray-300 text-sm text-center">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-4 py-2 border">Sr. No.</th>
//                     <th className="px-4 py-2 border">Product ID</th>
//                     <th className="px-4 py-2 border">Name</th>
//                     <th className="px-4 py-2 border">Price</th>
//                     <th className="px-4 py-2 border">Categories</th>
//                     <th className="px-4 py-2 border">Active</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {products.map((prod, index) => (
//                     <tr key={prod._id} className="hover:bg-gray-50">
//                       <td className="px-4 py-2 border">{index + 1}</td>
//                       <td className="px-4 py-2 border">{prod._id}</td>
//                       <td className="px-4 py-2 border font-medium">{prod.name}</td>
//                       <td className="px-4 py-2 border">${prod.price}</td>
//                       <td className="px-4 py-2 border">{prod.categories?.join(', ') || 'N/A'}</td>
//                       <td className="px-4 py-2 border">
//                         <label className="inline-flex items-center">
//                           <input
//                             type="checkbox"
//                             checked={prod.isActive || false}
//                             onChange={() => toggleStatus(prod._id)}
//                             className="sr-only"
//                           />
//                           <div className="w-10 h-5 bg-gray-300 rounded-full relative transition">
//                             <div
//                               className={`w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform ${
//                                 prod.isActive ? 'translate-x-5' : ''
//                               }`}
//                             />
//                           </div>
//                         </label>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//         <ToastContainer autoClose={3000} />
//       </div>
//     </div>
//   );
// };

// export default UpdateValues;



import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateValues = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [userMessages, setUserMessages] = useState([]);

  const [product, setProduct] = useState({
    name: '',
    price: '',
    categories: '',
    imageUrl: null,
  });

  const [activeSection, setActiveSection] = useState('orders');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const imageInputRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/order')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));

    fetchProducts();
  }, []);


  useEffect(() => {
    if (activeSection === 'users-messages') {
      axios.get('http://localhost:3000/api/contact')
        .then((res) => setUserMessages(res.data))
        .catch((err) => console.error("Error fetching messages:", err));
    }
  }, [activeSection]);
  

  const fetchProducts = () => {
    axios
      .get('http://localhost:3000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  };

  const toggleStatus = (id) => {
    axios
      .patch(`http://localhost:3000/api/products/toggle/${id}`)
      .then((res) => {
        const updated = res.data.product;
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? updated : p))
        );
        toast.success(`Product ${updated.isActive ? 'activated' : 'deactivated'} successfully!`);
      })
      .catch((err) => {
        console.error('Toggle failed:', err);
        toast.error("Error toggling product status.");
      });
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/order/${orderId}/status`, { status: newStatus });
      const updated = await axios.get('http://localhost:3000/api/order');
      setOrders(updated.data);
      toast.success("Order status updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error updating status.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, imageUrl: e.target.files[0] });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    if (!product.imageUrl) {
      toast.error("Please select an image for the product.");
      return;
    }

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.replace('$', ''));
    formData.append('categories', JSON.stringify(product.categories.split(',')));
    formData.append('imageUrl', product.imageUrl);

    try {
      const response = await axios.post('http://localhost:3000/api/products/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success("Product added successfully!");
      localStorage.setItem("productAdded", Date.now());
      setProduct({ name: '', price: '', categories: '', imageUrl: null });
      imageInputRef.current.value = null;
      fetchProducts();
    } catch (error) {
      toast.error("Error adding product.");
      console.error('Add product error:', error);
    }
  };

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 relative">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 shadow-md absolute h-full border-r border-gray-200">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Admin Panel</h2>
        <ul className="space-y-4">
  {['orders', 'add-product', 'show-product', 'users-messages'].map((section) => (
    <li key={section}>
      <button
        onClick={() => setActiveSection(section)}
        className={`w-full px-4 py-2 text-left rounded-lg text-lg font-medium transition ${
          activeSection === section
            ? 'bg-gray-200 text-gray-900'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        {section.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
      </button>
    </li>
  ))}
</ul>

      </div>

      {/* Main Content */}
      <div className="ml-64 w-full p-8">

        {/* ORDER SECTION */}

        {activeSection === 'orders' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Orders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300 text-sm text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">S.No</th>
                    <th className="px-4 py-2 border">Order No</th>
                    <th className="px-4 py-2 border">Shipping</th>
                    <th className="px-4 py-2 border">Total</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order, index) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{indexOfFirstOrder + index + 1}</td>
                      <td className="px-4 py-2 border">{order.orderNumber}</td>
                      <td className="px-4 py-2 border">{order.shippingInformation?.address}</td>
                      <td className="px-4 py-2 border">${order.totalPrice}</td>
                      <td className="px-4 py-2 border">{order.status}</td>
                      <td className="px-4 py-2 border">
                        <select
                          value={order.status || "Pending"}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="border px-2 py-1 rounded-md"
                        >
                          <option>Pending</option>
                          <option>Dispatch</option>
                          <option>Delivered</option>
                          <option>Shipped</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm  border border-gray-300 rounded-lg mr-2"
              >
                &lt;
              </button>
              <span className="text-sm font-semibold mx-2">Page {currentPage}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm  border border-gray-300 rounded-lg"
              >
                &gt;
              </button>
            </div>
          </div>
        )}

        {/* Add Product Section */}

        {activeSection === 'add-product' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Add Product</h2>
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300  px-3 py-2 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Categories (comma-separated)</label>
                  <input
                    type="text"
                    name="categories"
                    value={product.categories}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Product Image</label>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border px-3 py-2 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 border border-gray-600 translate-x-3 transition-all hover:bg-gray-600 hover:text-white text-black rounded-lg font-semibold shadow-md"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Show Product Section */}

        {activeSection === 'show-product' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">All Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border border-gray-300 text-sm text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Sr. No.</th>
                    <th className="px-4 py-2 border">Product ID</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Price</th>
                    <th className="px-4 py-2 border">Categories</th>
                    <th className="px-4 py-2 border">Active</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod, index) => (
                    <tr key={prod._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{prod._id}</td>
                      <td className="px-4 py-2 border font-medium">{prod.name}</td>
                      <td className="px-4 py-2 border">${prod.price}</td>
                      <td className="px-4 py-2 border">{prod.categories?.join(', ') || 'N/A'}</td>
                      <td className="px-4 py-2 border">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={prod.isActive || false}
                            onChange={() => toggleStatus(prod._id)}
                            className="sr-only"
                          />
                          <div className="w-10 h-5 bg-gray-600 rounded-full relative transition">
                            <div
                              className={`w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform ${
                                prod.isActive ? 'translate-x-5' : ''
                              }`}
                            />
                          </div>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


        {/* User Messages Section */}
        {activeSection === 'users-messages' && (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Users Messages</h2>
    <table className="min-w-full bg-white border">
      <thead>
        <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">Message</th>
        </tr>
      </thead>
      <tbody>
        {userMessages.map((msg, idx) => (
          <tr key={idx} className="hover:bg-gray-50 text-sm">
            <td className="py-2 px-4 border-b">{msg.name}</td>
            <td className="py-2 px-4 border-b">{msg.email}</td>
            <td className="py-2 px-4 border-b">{msg.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


        <ToastContainer autoClose={600} />
      </div>
    </div>
  );
};

export default UpdateValues;
