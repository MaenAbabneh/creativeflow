import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import ROUTES from "@/constants/routes";
import { getDeviconClassName } from "@/lib/utils";

interface Props {
  _id: string;
  name: string;
  qustions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  handleRemove?: (id: string) => void;
  isButton?: boolean;
}

const TagsCard = ({
  _id,
  name,
  qustions,
  showCount,
  compact,
  remove,
  handleRemove,
  isButton,
}: Props) => {
  const iconClass = getDeviconClassName(name);
  const content = (
    <>
      <Badge className=" dark:bg-dark-200 bg-light-700 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2 items-center">
          <i className={`${iconClass} text-lg `}></i>
          <span>{name}</span>
        </div>
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
        <p className="small-medium text-dark100_light900 items-center">
          {qustions}
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
      className="flex justify-between items-center pr-6 rounded-lg hover:bg-light200_dark700 transition-colors duration-200 ease-in-out cursor-pointer w-full">
        {content}
      </button>
    ) : (
      <Link
        href={ROUTES.TAGS(_id)}
        className="flex justify-between items-center  pr-6 rounded-lg hover:bg-light200_dark700 transition-colors duration-200 ease-in-out cursor-pointer w-full"
      >
        {content}
      </Link>
    );
  }
};

export default TagsCard;
