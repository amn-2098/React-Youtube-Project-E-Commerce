import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { FaCarSide, FaQuestion } from 'react-icons/fa'
import { addToCart } from '../redux/cartSlice' // Import cart action

const ProductDetail = () => {
    const { id } = useParams()
    const products = useSelector(state => state.product.products)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [product, setProduct] = useState()

    useEffect(() => {
        const newProduct = products.find(product => product.id === parseInt(id))
        setProduct(newProduct)
    }, [id, products])

    if (!product) {
        return <div>Product not found</div>
    }

    const handleAddToCart = () => {
        dispatch(addToCart(product))
        navigate('/cart')
    }

    return (
        <div className='container mx-auto py-8 px-4 md:px-16 lg:px-24'>
            <div className='flex flex-col md:flex-row gap-x-16'>
                {/* Product Image */}
                <div className='md:w-1/2 py-4 shadow-md md:px-8 h-96 flex justify-center items-center'>
                    <img src={product.image} alt={product.name} className='h-full' />
                </div>

                {/* Product Information */}
                <div className='md:w-1/2 p-4 shadow-md md:p-16 flex flex-col items-center gap-y-2'>
                    <h2 className='text-3xl font-semibold mb-2'>{product.name}</h2>
                    <p className='text-xl font-semibold text-gray-800 mb-4'>${product.price}</p>

                    <div className='flex gap-x-2 items-center'>
                        <input 
                            type="number"
                            id="quantity"
                            name="quantity"
                            // min="1"
                            className='border py-1 w-16'
                        />
                        <button 
                            onClick={handleAddToCart}
                            className='bg-red-600 text-white py-1.5 px-4 hover:bg-red-800'>
                            Add to Cart
                        </button>
                    </div>

                    <div className='flex flex-col gap-y-4 mt-4'>
                        <p className='flex items-center'>
                            <FaCarSide className='mr-1' />
                            Delivery & Return
                        </p>
                        <p className='flex items-center'>
                            <FaQuestion className='mr-1' />
                            Ask a Question?
                        </p>
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <div className='mt-8'>
                <h3 className='text-xl font-bold mb-2'>Product Description</h3>
                <p>Information about the product will appear here!</p>
            </div>
        </div>
    )
}

export default ProductDetail
