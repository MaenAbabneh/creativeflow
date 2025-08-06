import Link from "next/link";
import React from "react";

import Metric from "@/components/metric";
import ROUTES from "@/constants/routes";
import { hasSavedQuestion } from "@/lib/actions/collaction.action";
import { getPuplishTime } from "@/lib/utils";
import { Questions, Tags } from "@/types/global";

import SaveQuestion from "../question/save-question";
import ResponsiveEditDeleteAction from "../users/responsive-editedelete";
import TagsCard from "./tags-card";

interface Props {
  question: Questions;
  isProfilePage?: boolean;
  showActionBtns?: boolean;
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
  showActionBtns = false,
  isProfilePage = false,
}: Props) => {
  const hasSavedPromise = hasSavedQuestion({
    questionId: _id ?? "",
  });

  return (
    <div className="py-4 sm:py-6 px-4 sm:px-6 background-light800_dark300 dark:dark-gradient shadow-light-100 dark:shadow-dark-100 rounded-lg sm:rounded-xl mb-4 sm:mb-6 w-full hover:shadow-light-200 dark:hover:shadow-dark-200 transition-all duration-200 ease-in-out max-w-full">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Link
            href={ROUTES.QUESTION(_id)}
            className="cursor-pointer group flex-1"
          >
            <h3 className="h3-bold text-dark100_light900 group-hover:text-primary-500 dark:group-hover:text-primary-500 transition-colors duration-200 line-clamp-2 mb-2">
              {title}
            </h3>
            {content && (
              <p className="text-dark400_light700 line-clamp-2 sm:line-clamp-3 body-regular">
                {content}
              </p>
            )}
          </Link>
          <div className="flex  items-end justify-end relative bottom-30 left-5 sm:bottom-20 sm:left-6">
            {isProfilePage && showActionBtns && (
              <ResponsiveEditDeleteAction type="Question" itemId={_id} />
            )}
          </div>

          <div className="flex flex-col items-center justify-center shrink-0 w-6 h-6">
            {!isProfilePage && (
              <SaveQuestion
                questionId={_id}
                hasSavedPromise={hasSavedPromise}
                otherClassName="hidden sm:block"
              />
            )}
          </div>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center mt-2 sm:mt-3">
            {tags.map((tag: Tags) => (
              <TagsCard key={tag._id} _id={tag._id} name={tag.name} compact />
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-light-700 dark:border-dark-400">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Metric
              image={author.image}
              value={author.name}
              alt={author.name}
              href={ROUTES.PROFILE(author._id)}
              title=""
              textStyles="body-medium text-dark400_light700 truncate"
              isAuthor
            />
            <span className="text-dark400_light700 small-regular whitespace-nowrap ml-1 hidden sm:inline">
              • asked {getPuplishTime(createdAt)}
            </span>
            <span className="text-dark400_light700 small-regular whitespace-nowrap ml-1 sm:hidden">
              • {getPuplishTime(createdAt)}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center shrink-0 sm:justify-end">
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
