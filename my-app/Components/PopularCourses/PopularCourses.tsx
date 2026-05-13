import React from 'react'
import PopularCourseCard from './PopularCourseCard'

const courseList = [
  {
    id: 1,
    image: "/media/graphic-design.jpeg",
    title: "Graphic Design",
    description: "Creating Visual Content"
  },
  {
    id: 2,
    image: "/media/uxui-design.jpeg",
    title: "UI/UX Design",
    description: "Combines User Interface (UI)"
  },
  {
    id: 3,
    image: "/media/brand-identity.jpeg",
    title: "Brand Identity",
    description: "The Collection of Visual"
  },
  {
    id: 4,
    image: "/media/web-design.jpeg",
    title: "Web Design",
    description: "Process of Creating Websites"
  }
];

const PopularCourses = () => {
  return (
    <section className=''>
      {courseList.map((courseList) => (
        <PopularCourseCard
          key={courseList.id}
          image={courseList.image}
          title={courseList.title}
          description={courseList.description}
        />
      ))}
    </section>
  )
}

export default PopularCourses