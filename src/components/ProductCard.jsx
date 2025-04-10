// // import React from 'react';
// // import { FaStar } from 'react-icons/fa';
// // import { addToCart } from '../redux/cartSlice';
// // import { useDispatch } from 'react-redux';  // Keep only one import
// // import { Link } from 'react-router-dom';
// // import { toast } from 'react-toastify';

// // const ProductCard = ({ product }) => {
// //     const dispatch = useDispatch()

// //     const handleAddToCart = (e, product) => {
// //         e.stopPropagation()
// //         e.preventDefault()
// //         console.log("🛍 Adding Product:", product);
// //         console.log("Product Details:", product);  // Console log the product
// //         const cartData = {
// //             products: [{ 
// //                 id: product.id, 
// //                 name: product.name, 
// //                 price: product.price, 
// //                 quantity: 1, 
// //                 totalPrice: product.price, 
// //                 image: product.image 
// //             }],
// //             totalQuantity: 1,
// //             totalPrice: product.price
// //         };
// //         dispatch(addToCart(cartData));
        
// //         toast("Product Added Successfully!!")
// //     }

// //     return (
// //         <Link to={`/product/${product.id}`}>
// //         <div className='bg-white border p-4 rounded-md shadow-md relative transform transition-transform duration-300 hover:scale-105'>
// //             <img src={product.image} alt="" className='w-full h-48 object-contain mb-4' />
// //             <h3 className=' text-lg font-semibold'>{product.name}</h3>
// //             <p className='text-gray-500'>${product.price}</p>
// //             <div className='flex items-center mt-2'>
// //                 <FaStar className='text-yellow-500' />
// //                 <FaStar className='text-yellow-500' />
// //                 <FaStar className='text-yellow-500' />
// //                 <FaStar className='text-yellow-500' />
// //                 <FaStar className='text-yellow-500' />
// //             </div>
// //             {/* <div 
// //                 className='absolute bottom-4 right-2 flex items-center justify-center w-8 h-8 bg-red-600 group text-white text-sm rounded-full hover:w-32 hover:bg-red-700 transition-all duration-100' 
// //                 onClick={(e) => handleAddToCart(e, product)}
// //             >
// //                 <span className="group-hover:hidden">+</span>
// //                 <span className="hidden group-hover:block">Add to Cart</span>
// //             </div> */}
// //             {/* Changed this part: Removed hover effect and kept only the "+" icon */}
// //             <div 
// //                 className='absolute bottom-4 right-2 flex items-center justify-center w-8 h-8 bg-red-600 text-white text-sm rounded-full cursor-pointer' 
// //                 onClick={(e) => handleAddToCart(e, product)}
// //             > +
// //             </div>
// //         </div>
// //         </Link>
// //     )
// // };

// // export default ProductCard;





import React from 'react';
import { FaStar } from 'react-icons/fa';
import { addToCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';  // Keep only one import
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        e.preventDefault();
      
        const cartData = {
            id: product._id || product.id,  // ✅ ensure there's always a unique id
            name: product.name,
            price: product.price,
            quantity: 1,
            totalPrice: product.price,
            image: product.imageUrl || product.image, // ✅ safe image assignment
          };
          
      
        dispatch(addToCart(cartData));
        toast("Product Added Successfully!!");
      };
      

    // const handleAddToCart = (e, product) => {
    //     e.stopPropagation();
    //     e.preventDefault();
    
    //     // Check if image exists and is a valid URL
    //     if (!product.image || typeof product.image !== "string" || !product.image.startsWith("http")) {
    //         toast.error("Product image is missing or invalid!");
    //         return;
    //     }
    
    //     dispatch(addToCart(product));
    //     toast("Product Added Successfully!!");
    // };
    
    // console.log("🖼 Product Image:", product.image);
    // console.log("🔍 Full Product Data:", product);
    

    return (
        <Link to={`/product/${product._id || product.id}`}>

        <div className='bg-white border p-4 rounded-md shadow-md relative transform transition-transform duration-300 hover:scale-105'>
            <img src={product.imageUrl} alt={product.name} className='w-full h-48 object-contain mb-4' />
            <h3 className=' text-lg font-semibold'>{product.name}</h3>
            <p className='text-gray-500'>${product.price}</p>
            <div className='flex items-center mt-2'>
                <FaStar className='text-yellow-500' />
                <FaStar className='text-yellow-500' />
                <FaStar className='text-yellow-500' />
                <FaStar className='text-yellow-500' />
                <FaStar className='text-yellow-500' />
            </div>
            {/* <div 
                className='absolute bottom-4 right-2 flex items-center justify-center w-8 h-8 bg-red-600 group text-white text-sm rounded-full hover:w-32 hover:bg-red-700 transition-all duration-100' 
                onClick={(e) => handleAddToCart(e, product)}
            >
                <span className="group-hover:hidden">+</span>
                <span className="hidden group-hover:block">Add to Cart</span>
            </div> */}
            {/* Changed this part: Removed hover effect and kept only the "+" icon */}
            <div 
                className='absolute bottom-4 right-2 flex items-center justify-center w-8 h-8 bg-red-600 text-white text-sm rounded-full cursor-pointer' 
                onClick={(e) => handleAddToCart(e, product)}
            > +
            </div>
        </div>
        </Link>
    )
};

export default ProductCard;