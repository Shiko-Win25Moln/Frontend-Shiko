import CourseDetailsTabs from "@/Components/Courses/CourseDetailsTabs";
import TeamSidebar from "@/Components/Team/TeamSidebar";
import Image from "next/image";


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

type CourseFaq = {
  id: number;
  courseId: number;
  question: string;
  answer: string;
};

type CourseDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getCourse(id: string): Promise<Course> {
  const response = await fetch(
    `https://shiko-webapp.azurewebsites.net/api/courses/${id}`,
    {
       next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch course. Status: ${response.status}`);
  }

  return response.json();
}

async function getAuthors(): Promise<CourseAuthor[]> {
  const response = await fetch(
    "https://shiko-courseauthor-webapp.azurewebsites.net/api/course-authors",
    {
       next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch authors. Status: ${response.status}`);
  }

  return response.json();
}

async function getFaqs(courseId: string): Promise<CourseFaq[]> {
  const response = await fetch(
    `https://shiko-coursefaq-webapp.azurewebsites.net/api/course-faqs/course/${courseId}`,
    {
       next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch FAQs. Status: ${response.status}`);
  }

  return response.json();
}

export default async function CourseDetailsPage({
  params,
}: CourseDetailsPageProps) {
  const { id } = await params;

  const course = await getCourse(id);
  const authors = await getAuthors();
  const faqs = await getFaqs(id);

  const author = authors.find(
    (author) => author.id === course.courseAuthorId
  );

  if (!author) {
    throw new Error(`Author with id ${course.courseAuthorId} was not found`);
  }

  return (
     <main className="min-h-screen bg-[#F7F7F8]">
    <div className="flex">
      <TeamSidebar />

      <section className="flex-1 px-6 py-6">
        <div className="mx-auto grid max-w-7xl grid-cols-[0.6fr]">
          <section>
            <div className="grid grid-cols-[1fr] gap-6">
              <article className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="mb-3 text-sm text-[#8A8A8A]">
                  Courses &gt; {course.title}
                </div>

                <div className="relative overflow-hidden rounded-3xl">
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    width={900}
                    height={460}
                    className="h-75 w-full object-cover"
                  />
                </div>

                <div className="mt-6">
                  <h1 className="text-3xl font-bold text-[#252B42]">
                    {course.title}
                  </h1>

                  <div className="mt-4 flex items-center gap-3">
                    <Image
                      src={author.authorImage}
                      alt={author.authorName}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover"
                    />

                    <p className="text-sm text-[#8A8A8A]">
                      Author:{" "}
                      <span className="font-semibold text-[#252B42]">
                        {author.authorName}
                      </span>
                    </p>
                  </div>
                </div>

                <CourseDetailsTabs faqs={faqs} />
              </article>
            </div>
          </section>
        </div>
      </section>
    </div>
  </main>
);
}
