// import React, { useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useParams, useNavigate } from 'react-router-dom'
// import { FaCarSide, FaQuestion } from 'react-icons/fa'
// import { addToCart } from '../redux/cartSlice' // Import cart action

// const ProductDetail = () => {
//     const { id } = useParams()
//     const products = useSelector(state => state.product.products)
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const [product, setProduct] = useState()
//     const [quantity, setQuantity] = useState(1) // State for quantity

//     useEffect(() => {
//         const newProduct = products.find(product => product.id === parseInt(id))
//         setProduct(newProduct)
//         console.log("selected product", newProduct)
//         console.log("all products", products)
//     }, [id, products])

//     if (!product) {
//         return <div>Product not found</div>
//     }

//     const handleAddToCart = () => {
//         const cartProduct = {
//             id: product.id || product._id,
//             name: product.name,
//             price: product.price,
//             quantity,
//             totalPrice: product.price * quantity, // Calculate total price
//             image: product.image || product.imageUrl // Ensure image is set
//         };
//         dispatch(addToCart(cartProduct));
//         navigate('/cart');
//     };

//     // Handle increment
//     const incrementQuantity = () => {
//         setQuantity(prevQuantity => prevQuantity + 1)
//     }

//     // Handle decrement
//     const decrementQuantity = () => {
//         if (quantity > 1) {
//             setQuantity(prevQuantity => prevQuantity - 1)
//         }
//     }

//     return (
//         <div className='container mx-auto py-8 px-4 md:px-16 lg:px-24'>
//             <div className='flex flex-col md:flex-row gap-x-16'>
//                 {/* Product Image */}
//                 <div className='md:w-1/2 py-4 shadow-md md:px-8 h-96 flex justify-center items-center'>
//                     <img src={product.imageUrl} alt={product.name} className='h-full' />
//                 </div>

//                 {/* Product Information */}
//                 <div className='md:w-1/2 p-4 shadow-md md:p-16 flex flex-col items-center gap-y-2'>
//                     <h2 className='text-3xl font-semibold mb-2'>{product.name}</h2>
//                     <p className='text-xl font-semibold text-gray-800 mb-4'>${product.price}</p>

//                     <div className='flex gap-x-2 items-center'>
//                         {/* Decrement Button */}
//                         <button onClick={decrementQuantity} className="border py-1 w-10 text-center">-</button>
                        
//                         <input 
//                             type="number"
//                             id="quantity"
//                             name="quantity"
//                             value={quantity}
//                             onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
//                             className='border py-1 w-16 text-center'
//                         />
                        
//                         {/* Increment Button */}
//                         <button onClick={incrementQuantity} className="border py-1 w-10 text-center">+</button>

//                         <button 
//                             onClick={handleAddToCart}
//                             className='bg-red-600 text-white py-1.5 px-4 hover:bg-red-800'>
//                             Add to Cart
//                         </button>
//                     </div>

//                     <div className='flex flex-col gap-y-4 mt-4'>
//                         <p className='flex items-center'>
//                             <FaCarSide className='mr-1' />
//                             Delivery & Return
//                         </p>
//                         <p className='flex items-center'>
//                             <FaQuestion className='mr-1' />
//                             Ask a Question?
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Product Description */}
//             <div className='mt-8'>
//                 <h3 className='text-xl font-bold mb-2'>Product Description</h3>
//                 <p>Information about the product will appear here!</p>
//             </div>
//         </div>
//     )
// }

// export default ProductDetail



import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCarSide, FaQuestion } from 'react-icons/fa';
import { addToCart } from '../redux/cartSlice';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams();
    const products = useSelector(state => state.product.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (!id) return; // Prevent undefined API calls
    
        const foundProduct = products.find(p =>
            p.id === parseInt(id) || p._id === id
        );
    
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            axios.get(`http://localhost:3000/api/products/${id}`)
                .then(res => {
                    const fetched = res.data;
                    fetched.imageUrl = fetched.image?.startsWith('./')
                        ? fetched.image.replace('./', 'http://localhost:3000/')
                        : fetched.image;
                    setProduct(fetched);
                })
                .catch(err => {
                    console.error("Failed to fetch product by ID", err);
                });
        }
    }, [id, products]);
    

    if (!product) {
        return <div className="text-center py-20 text-xl">Product not found</div>;
    }

    const handleAddToCart = () => {
        const cartProduct = {
            id: product.id || product._id,
            name: product.name,
            price: product.price,
            quantity,
            totalPrice: product.price * quantity,
            image: product.imageUrl || product.image

        };
        dispatch(addToCart(cartProduct));
        navigate('/cart');
    };

    const incrementQuantity = () => setQuantity(q => q + 1);
    const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    return (
        <div className='container mx-auto py-8 px-4 md:px-16 lg:px-24'>
            <div className='flex flex-col md:flex-row gap-x-16'>
                <div className='md:w-1/2 py-4 shadow-md md:px-8 h-96 flex justify-center items-center'>
                    <img
                        src={product.imageUrl || 'https://via.placeholder.com/300'}
                        alt={product.name}
                        className='h-full object-contain'
                    />
                </div>

                <div className='md:w-1/2 p-4 shadow-md md:p-16 flex flex-col items-center gap-y-2'>
                    <h2 className='text-3xl font-semibold mb-2'>{product.name}</h2>
                    <p className='text-xl font-semibold text-gray-800 mb-4'>${product.price}</p>

                    <div className='flex gap-x-2 items-center'>
                        <button onClick={decrementQuantity} className="border py-1 w-10 text-center">-</button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            className='border py-1 w-16 text-center'
                        />
                        <button onClick={incrementQuantity} className="border py-1 w-10 text-center">+</button>
                        <button
                            onClick={handleAddToCart}
                            className='bg-red-600 text-white py-1.5 px-4 hover:bg-red-800'>
                            Add to Cart
                        </button>
                    </div>

                    <div className='flex flex-col gap-y-4 mt-4'>
                        <p className='flex items-center'><FaCarSide className='mr-1' /> Delivery & Return</p>
                        <p className='flex items-center'><FaQuestion className='mr-1' /> Ask a Question?</p>
                    </div>
                </div>
            </div>

            <div className='mt-8'>
                <h3 className='text-xl font-bold mb-2'>Product Description</h3>
                <p>{product.description || "Information about the product will appear here!"}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
