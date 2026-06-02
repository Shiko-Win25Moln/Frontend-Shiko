import React from 'react'
import Rating from '@/Components/StarRating/Rating'

type starRating = {
    name: string;
    rating: number;
}

export default async function page() {

    const response = await fetch ("https://mikelstarrating.azurewebsites.net/rating")
    const starRating: starRating = await response.json();

  return (
    <>
        <div className='px-3 py-2 inline-flex'>
            <Rating value={starRating.rating} />
        </div>
    </>
  )
}
