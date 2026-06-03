// import Image from "next/image";

type PopularCourseCardProps = {
    // imageUrl: string,
    title: string,
    description: string,
}
 
const PopularCourseCard = ({ title, description }: PopularCourseCardProps) => {
  return (
    <>
      <article>
        <div className="">
          {/* <Image
            src={imageUrl}
            alt={title}
            width={60}
            height={60}
            className="w-full h-48 object-cover rounded-lg"
          /> */}

          <h3 className="mt-4 text-x1 font-semibold">{title}</h3>

          <p className="mt-2 text-dark-text">{description}</p>
        </div>
      </article>
    </>
  )
}

export default PopularCourseCard