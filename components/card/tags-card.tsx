import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import ROUTES from "@/constants/routes";
import { cn, getDeviconClassName, getTechDescription } from "@/lib/utils";

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  handleRemove?: (id: string) => void;
  isButton?: boolean;
}

const TagsCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  remove,
  handleRemove,
  isButton,
}: Props) => {
  const iconClass = getDeviconClassName(name);
  const iconDescription = getTechDescription(name);

  const content = (
    <>
      <Badge className="dark:bg-dark-200 bg-light-700 text-light400_light500 rounded-md border-none px-3 py-1.5 uppercase inline-flex items-center gap-1.5">
        <i className={`${iconClass} text-sm`}></i>
        <span className="text-xs font-medium">{name}</span>
        {remove && (
          <Image
            src="/icons/close.svg"
            alt="remove icon"
            width={16}
            height={16}
            className="cursor-pointer ml-2 invert-colors-2 hover:opacity-80 transition-opacity duration-200"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRemove && handleRemove(_id);
            }}
          />
        )}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark100_light900 ml-auto">
          {questions}
        </p>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className={`inline-flex items-center ${showCount ? "justify-between w-full" : "justify-center"} rounded-lg hover:bg-light200_dark700 transition-colors duration-200 ease-in-out cursor-pointer px-2 py-1.5`}
      >
        {content}
      </button>
    ) : (
      <Link
        href={ROUTES.TAG(_id)}
        className={`inline-flex items-center ${showCount ? "justify-between w-full" : "justify-center"} rounded-lg hover:bg-light200_dark700 transition-colors duration-200 ease-in-out cursor-pointer px-2 py-1.5`}
      >
        {content}
      </Link>
    );
  }

  return (
    <Link href={ROUTES.TAG(_id)} className="shadow-light100_darknone">
      <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
        <div className="flex items-center justify-between gap-3">
          <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
            <p className="paragraph-semibold text-dark300_light900">{name}</p>
          </div>
          <i className={cn(iconClass, "text-2xl")} aria-hidden="true" />
        </div>

        <p className="small-regular text-dark500_light700 mt-5 line-clamp-3 w-full">
          {iconDescription}
        </p>

        <p className="small-medium text-dark400_light500 mt-3.5">
          <span className="body-semibold primary-text-gradient mr-2.5">
            {questions}+
          </span>
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagsCard;
