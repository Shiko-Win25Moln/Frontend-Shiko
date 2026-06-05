import React from 'react'
import { Star } from './Star';
import AverageRating from './AverageRating';

type SummaryProps = {
    averageRating: number;
    reviewCount: number;
};

export default async function Summary({reviewCount }: SummaryProps) {


  return (
    <>
        <div className='flex items-center gap-2 text-sm'>
            <Star />

            <AverageRating />

            <span className='text-secondary'>({reviewCount} reviews)</span>
        </div>
    </>
  )
}
