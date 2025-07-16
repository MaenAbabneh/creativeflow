import ROUTES from "@/constants/routes";
import { getPuplishTime } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import TagsCard from "./tags-card";
import Metric from "@/components/metric";
import { Questions, Tags } from "@/types/global";

interface Props {
  question: Questions;
}

const QuestionCard = ({
  question: {
    _id,
    title,
    tags,
    author,
    createdAt,
    views,
    upvotes,
    answers,
    content,
  },
}: Props) => {
  return (
    <div className="pt-6 pb-4 px-4 sm:px-6 background-light800_dark300 dark:dark-gradient shadow-light-100 dark:shadow-dark-100 rounded-lg mb-4 sm:mb-6 w-full hover:shadow-light-200 dark:hover:shadow-dark-200 transition-shadow duration-200 max-w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Link href={ROUTES.QUESTION(_id)} className="cursor-pointer group">
            <h3 className="h3-bold text-dark100_light900 group-hover:text-primary-500 dark:group-hover:text-primary-500 transition-colors line-clamp-2">
              {title}
            </h3>
            {content && (
              <p className="text-dark400_light700 line-clamp-2 mt-2 body-regular">
                {content}
              </p>
            )}
          </Link>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center mt-3 mb-2">
            {tags.map((tag: Tags) => (
              <TagsCard key={tag._id} _id={tag._id} name={tag.name} compact />
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-light-700 dark:border-dark-400">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Metric
              image={author.image}
              value={author.name}
              alt={author.name}
              href={ROUTES.PROFILE(author._id)}
              title=""
              textStyles="body-medium text-dark400_light700"
              isAuthor
            />
            <span className="text-dark400_light700 small-regular whitespace-nowrap ml-1">
              • asked {getPuplishTime(createdAt)}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 items-center shrink-0 sm:justify-end">
            <Metric
              image="/icons/like.svg"
              alt="upvote icon"
              value={upvotes}
              title=" Upvotes"
              textStyles="small-medium text-dark400_light800"
            />
            <Metric
              image="/icons/eye.svg"
              alt="views icon"
              value={views}
              title=" Views"
              textStyles="small-medium text-dark400_light800"
            />
            <Metric
              image="/icons/message.svg"
              alt="answer icon"
              value={answers}
              title=" Answers"
              textStyles="small-medium text-dark400_light800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
