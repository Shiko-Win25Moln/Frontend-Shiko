import Image from "next/image"
import CourseAuthor from "./CourseAuthor";

type CourseCardProps = {
    title: string;
    imageUrl: string;
    authorName: string;
    authorImage: string;

}

const CourseCard = ({ title, imageUrl, authorName, authorImage }: CourseCardProps) => {
  return (
    <article className="rounded-3xl bg-white p-3 shadow-sm">
      <Image
        src={imageUrl}
        alt={title}
        width={500}
        height={260}
        className="h-40 w-full rounded-2xl object-cover"
      />

      <div className="mt-4">
        <h2 className="text-lg font-bold text-secondary">
          {title}
        </h2>

        <div className="mt-3">
          <CourseAuthor
            authorName={authorName}
            authorImage={authorImage}
          />
        </div>
      </div>
    </article>
  )
}

export default CourseCard