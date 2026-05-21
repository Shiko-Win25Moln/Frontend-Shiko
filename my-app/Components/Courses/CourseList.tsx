import CourseCard from "./CourseCard";


type Course = {
    id: number;
    title: string;
    imageUrl: string;
    courseAuthorId: number;
};

type CourseAuthor = {
    id: number;
    authorName: string;
    authorImage: string;
};

async function getCourses(): Promise<Course[]> {
  const response = await fetch(
    "https://shiko-webapp.azurewebsites.net/api/courses",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch courses. Status: ${response.status}`);
  }

  return response.json();
}

async function getAuthors(): Promise<CourseAuthor[]> {
  const response = await fetch(
    "https://shiko-courseauthor-webapp.azurewebsites.net/api/course-authors",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch authors. Status: ${response.status}`);
  }

  return response.json();
}

const CourseList = async () => {
    const courses = await getCourses();
    const authors = await getAuthors();
  return (
    <section className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => {
        const author = authors.find(
          (author) => author.id === course.courseAuthorId
        );

        if (!author) {
          throw new Error(`Author with id ${course.courseAuthorId} was not found`);
        }

        return (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            imageUrl={course.imageUrl}
            authorName={author.authorName}
            authorImage={author.authorImage}
          />
        );
      })}
    </section>
  )
}

export default CourseList

