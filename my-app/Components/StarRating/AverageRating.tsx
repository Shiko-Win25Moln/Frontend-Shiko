import React from 'react'

async function getAverageRating () {
    const response = await fetch("https://localhost:4443/reviews/averagereviews",
        {cache: "no-store"}
    );

    return response.json();
};

export default async function AverageReview () {
    const rating = await getAverageRating();
    return (
        <>
            <div>
                <span className='font-semibold text-dark-text'>
                    {rating.toFixed(1)}
                </span>
            </div>
        </>
    )
}

