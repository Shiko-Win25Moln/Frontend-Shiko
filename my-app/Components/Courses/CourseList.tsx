import CourseCard from "./CourseCard";


const courses = [
  {
    id: 1,
    title: "Artificial Intelligence",
    imageUrl: "/images/course-ai.jpg",
    authorName: "Samantha William",
    authorImage: "/images/author-samantha.jpg",
  },
  {
    id: 2,
    title: "Data Science & Analytics",
    imageUrl: "/images/course-data-science.jpg",
    authorName: "Karen Hope",
    authorImage: "/images/author-karen.jpg",
  },
  {
    id: 3,
    title: "Digital Marketing",
    imageUrl: "/images/course-digital-marketing.jpg",
    authorName: "Jack Sally",
    authorImage: "/images/author-jack.jpg",
  },
];

const CourseList = () => {
  return (
    <section className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          title={course.title}
          imageUrl={course.imageUrl}
          authorName={course.authorName}
          authorImage={course.authorImage}
        />
      ))}
    </section>
  )
}

export default CourseList

