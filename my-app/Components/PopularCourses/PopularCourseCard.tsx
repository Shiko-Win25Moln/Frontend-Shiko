import Image from "next/image";

type PopularCourseCardProps = {
    image: string,
    title: string,
    description: string,
}
 
const PopularCourseCard = ({ image, title, description }: PopularCourseCardProps) => {
  return (
     <article>
      <Image
        src={image}
        alt={title}
        width={60}
        height={60}
        className="h-48 w-full rounded-2xl object-cover"
      />

      <div>
        <h2 className="text-lg font-medium text-secondary">
          {title}
        </h2>
        <h2>
          {description}
        </h2>
      </div>
     </article>
  )
}

export default PopularCourseCard