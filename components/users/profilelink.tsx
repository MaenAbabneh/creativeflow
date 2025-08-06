import Image from "next/image";
import Link from "next/link";

interface Props {
  imgUrl: string;
  href?: string;
  title: string;
}
function ProfileLink({ imgUrl, href, title }: Props) {
  return (
    <div className="flex-center gap-1.5 sm:gap-2 transition-all duration-200 hover:opacity-80">
      <Image
        src={imgUrl}
        alt={title}
        width={16}
        height={16}
        className="sm:w-5 sm:h-5 flex-shrink-0"
      />

      {href ? (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="paragraph-medium text-link-100 hover:text-link-500 transition-colors duration-200 truncate"
        >
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700 truncate">
          {title}
        </p>
      )}
    </div>
  );
}

export default ProfileLink;
