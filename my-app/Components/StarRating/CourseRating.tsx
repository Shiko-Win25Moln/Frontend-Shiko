import React from 'react'
import { Star } from './Star'

type courseRating = {
    value: number;
}

export default function CourseRating({ value }: courseRating) {
  return (
    <>
        <div className='flex items-center gap-1'>
            <span className='text-sm text-light-text'>{value?.toFixed(1)}</span>
            <Star />
        </div>
    </>
  )
}
