import Image from "next/image";

type CourseAuthorProps = {
  authorImage: string;
  authorName: string;
}

const CourseAuthor = ( { authorImage, authorName }: CourseAuthorProps ) => {
  return (
    <div className="flex items-center gap-2">
        <Image src={authorImage} alt={authorName} width={50} height={50} className="h-6 w-6 rounded-full object-cover" />
        <span className="text-sm text-light-text">{authorName}</span>
    </div>
  )
}

export default CourseAuthor