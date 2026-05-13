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
        className=""
      />

      <div>
        <h2 className="font-medium text-secondary">
          {title}
          {description}
        </h2>
      </div>
     </article>
  )
}

export default PopularCourseCard