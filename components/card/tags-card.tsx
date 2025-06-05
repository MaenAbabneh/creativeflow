import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import ROUTES from "@/constants/routes";
import { getDeviconClassName } from "@/lib/utils";

interface Props {
  _id: string;
  name: string;
  qustions?: number;
  showCount?: boolean;
  compact?: boolean;
}

const TagsCard = ({ _id, name, qustions, showCount, compact }: Props) => {
  const iconClass = getDeviconClassName(name);

  return (
    <Link
      href={ROUTES.TAGS(_id)}
      className="flex justify-between items-center  pr-6 rounded-lg hover:bg-light200_dark700 transition-colors duration-200 ease-in-out cursor-pointer w-full"
    >
      <Badge className=" dark:bg-dark-200 bg-light-700 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2 items-center">
          <i className={`${iconClass} text-lg `}></i>
          <span># {name}</span>
        </div>
      </Badge>

      {showCount && (
        <p className="small-medium text-dark100_light900 items-center">
          {qustions}
        </p>
      )}
    </Link>
  );
};

export default TagsCard;
