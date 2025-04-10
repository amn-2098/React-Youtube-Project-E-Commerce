// import React from 'react';
// import { useSelector } from 'react-redux';
// import ProductCard from '../components/ProductCard';

// const Shop = () => {
//   // Access the products from the Redux store using useSelector
//   const products = useSelector((state) => state.product.products);

//   console.log('Products:', products);

//   return (
//     <div className='mx-auto py-12 px-4 md:px-16 lg:px-24 '>
//       <h2 className='text-2xl font-bold mb-6 text-center'>Shop</h2>
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer'>
//         {products.length > 0 ? (
//           products.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))
//         ) : (
//           <p>No products available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Shop;



import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Shop = () => {
  const reduxProducts = useSelector(state => state.product.products);
  const [latestProducts, setLatestProducts] = useState([]);




  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then(res => {
        const updated = res.data.map(p => ({
          ...p,
          imageUrl: p.image.startsWith('./') 
            ? p.image.replace('./', 'http://localhost:3000/') 
            : p.image
        }));
        setLatestProducts(updated);
        
        // setLatestProducts(updated);
      })
      .catch(err => console.error('Failed to fetch latest products', err));
  }, []);

  // useEffect(() => {
  //   axios.get('http://localhost:3000/api/products').then((res) => {
  //     const activeProducts = res.data
  //       .filter((p) => p.isActive)
  //       .map(p => ({
  //         ...p,
  //         imageUrl: p.image.startsWith('./') 
  //           ? p.image.replace('./', 'http://localhost:3000/') 
  //           : p.image
  //       }));
  //     setLatestProducts(activeProducts);
  //   });
  // }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then((res) => {
        const activeProducts = res.data
          .filter((p) => p.isActive)
          .map((p, index) => ({
            ...p,
            _id: p._id || `temp-${index}`, // ✅ ensures unique ID
            imageUrl: p.image.startsWith('./') 
              ? p.image.replace('./', 'http://localhost:3000/') 
              : p.image
          }));
        setLatestProducts(activeProducts);
      });
  }, []);
  
  
  

  console.log("Received Products:", latestProducts);

  const allProducts = [...reduxProducts, ...latestProducts];

  return (
    <div className='mx-auto py-12 px-4 md:px-16 lg:px-24 '>
      <h2 className='text-2xl font-bold mb-6 text-center'>Shop</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer'>
        {allProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;

