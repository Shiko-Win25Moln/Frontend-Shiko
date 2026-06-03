import React from 'react'
import PopularCourseCard from './PopularCourseCard'

type PopularCourse = {
  id: number;
  // imageUrl: string;
  title: string;
  description: string;
}

// const courseList = [
//   {
//     id: 1,
//     image: "/media/graphic-design.jpeg",
//     title: "Graphic Design",
//     description: "Creating Visual Content"
//   },
//   {
//     id: 2,
//     image: "/media/uxui-design.jpeg",
//     title: "UI/UX Design",
//     description: "Combines User Interface (UI)"
//   },
//   {
//     id: 3,
//     image: "/media/brand-identity.jpeg",
//     title: "Brand Identity",
//     description: "The Collection of Visual"
//   },
//   {
//     id: 4,
//     image: "/media/web-design.jpeg",
//     title: "Web Design",
//     description: "Process of Creating Websites"
//   }
// ];

export default async function PopularCourses () {
  const response = await fetch("https://shiko-popularcourses-webapp.azurewebsites.net/api/popularcourses")
  const courses: PopularCourse[] = await response.json();

  return (
    <section className='rounded-3x1 bg-gray100 p-6'>
      <h2 className='mb-4 text-3xl font-bold'>
        Popular This Week
      </h2>

      <div className='grid gap-4 md:grid-cols-4'>
        {courses.map((course) => (
          <PopularCourseCard
          key={course.id}
          // imageUrl={course.imageUrl}
          title={course.title}
          description={course.description}
          />
        ))}
      </div>
    </section>
  )
}