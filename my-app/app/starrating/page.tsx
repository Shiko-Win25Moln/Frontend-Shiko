import Rating from '@/Components/StarRating/Rating'
import CourseRating from '@/Components/StarRating/CourseRating'

type RatingResponse = {
    name: string;
    stars: number;
}

const page = async () => {
    const courseId = 123;

    const [ response, courseResponse] = await Promise.all([
        fetch("https://shiko-starrating-webbapp.azurewebsites.net/rating"),
        // fetch("https://shiko-starrating-webbapp.azurewebsites.net/coursestars")
        fetch(`https://shiko-starrating-webbapp.azurewebsites.net/coursestars/${courseId}`)
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

export default page