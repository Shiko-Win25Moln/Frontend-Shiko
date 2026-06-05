import React from 'react'
import { Star } from './Star'

type RatingProps = {
    value: number;
}

export default function Rating({ value }: RatingProps) {
  return (
    <div className='flex items-center gap-1'>
        <span className='text-sm text-light-text'>{value?.toFixed(1)}</span>
        <Star />
    </div>
  )
}