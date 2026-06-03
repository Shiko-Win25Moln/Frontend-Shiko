import React from 'react'
import Rating from '@/Components/StarRating/Rating'
import CourseRating from '@/Components/StarRating/CourseRating'

type RatingResponse = {
    name: string;
    stars: number;
}


export default async function page() {
    const courseId = 123;

    const [ response, courseResponse ] = await Promise.all([
        fetch("https://mikelstarrating.azurewebsites.net/rating"),
        fetch(`https://mikelstarrating.azurewebsites.net/courserating/${courseId}`)
    ]);

    if (!response.ok || !courseResponse.ok) {
        throw new Error("Failed to fetch data");
    }

    const starRating: RatingResponse = await response.json();
    const courseRating: RatingResponse = await courseResponse.json();

  return (
    <>
        <div className='px-3 py-2 inline-flex gap-4'>
            <Rating value={starRating.stars} />
            <CourseRating value={courseRating.stars} />
        </div>
    </>
  )
}
