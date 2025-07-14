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
    <div className="pt-6 pb-4 sm:px-5 px-6 background-light800_dark300 dark:dark-gradient shadow-light-100 dark:shadow-dark-100 rounded-lg  mb-4 sm:mb-6 min-w-full mr-auto sm:min-w-160 lg:min-w-170">
      <div className="flex sm:flex-row flex-col-reverse items-start justify-between gap-4 ">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden relative bottom-4">
            {getPuplishTime(createdAt)}
          </span>
          <Link href={ROUTES.QUESTION(_id)} className="cursor-pointer">
            <h3 className="h3-bold text-dark100_light900">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 line-clamp-1">{content}</p>
          </Link>
        </div>
      </div>
      <div className="flex w-full mt-4 flex-wrap justify-between items-center">
        <div className="flex items-center">
          {tags.map((tag: Tags) => (
            <TagsCard key={tag._id} _id={tag._id} name={tag.name} compact />
          ))}
        </div>
      </div>
      <div className="flex-between flex-wrap w-full mt-4">
        <Metric
          key={_id}
          image={author.image}
          value={author.name}
          alt={author.name}
          href={ROUTES.PROFILE(author._id)}
          title={`• asked ${getPuplishTime(createdAt)}`}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />
        <div className="flex max-sm:flex-wrap gap-3 items-center max-sm:justify-start ">
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
  );
};

export default QuestionCard;
