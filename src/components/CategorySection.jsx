import React from 'react'
import ManCategory from '../assets/Images/man.png'
import WomanCategory from '../assets/Images/woman.png'
import KidCategory from '../assets/Images/kid.png'


    const categories=[
        {
            title:'Men',
            imageUrl:ManCategory
        },
        {
            title:'Women',
            imageUrl:WomanCategory
        },
        {
            title:'Kid',
            imageUrl:KidCategory
        },
    ]

const CategorySection = () => {
    console.log('Categories:', categories);
  return (
<div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {categories.map((category, index) => (
    <div key={index} className="relative h-64 transform transition-transform duration-300 hover:scale-105 cursor-pointer">
      <img src={category.imageUrl} alt="CategoryImage" className="w-full h-full object-cover rounded-lg shadow-md" />
      <div className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/80 px-4 py-2 rounded-md">
        <p className="text-xl font-bold">{category.title}</p>
        <p className="text-gray-600">View All</p>
      </div>
    </div>
  ))}
</div>


  )
}

export default CategorySection