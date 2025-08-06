import Link from "next/link";
import { Suspense } from "react";

import { Preview } from "@/components/editor/preview";
import ROUTES from "@/constants/routes";
import { hasVoted } from "@/lib/actions/vote.action";
import { cn, getPuplishTime } from "@/lib/utils";
import { Answers } from "@/types/global";

import UserAvatar from "../UserAvatar";
import ResponsiveEditDeleteAction from "../users/responsive-editedelete";
import Votes from "../votes/votes";

interface Props extends Answers {
  containerClasses?: string;
  showActionBtns?: boolean;
  showReadMore?: boolean;
  isProfilePage?: boolean;
}

const AnswerCard = ({
  _id,
  author,
  content,
  createdAt,
  upvotes,
  downvotes,
  question,
  containerClasses = "",
  showActionBtns = false,
  showReadMore = true,
  isProfilePage = false,
}: Props) => {
  const hasVotedPromise = hasVoted({
    targetId: _id,
    targetType: "answer",
  });
  return (
    <article className={cn("light-border border-b py-10", containerClasses)}>
      <span id={JSON.stringify(_id)} className="hash-span" />
      {showActionBtns && isProfilePage && (
        <div className="flex items-end justify-end relative bottom-0 left-4 sm:bottom-3 sm:left-6">
          <ResponsiveEditDeleteAction type="Answer" itemId={_id} />
        </div>
      )}
      <div className="mb-5 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <div className="flex flex-1 items-start gap-1 sm:items-center">
          <UserAvatar
            id={author._id}
            name={author.name}
            imageUrl={author.image}
            className="size-5 rounded-full object-cover max-sm:mt-2"
          />

          <Link
            href={ROUTES.PROFILE(author._id)}
            className="flex flex-col max-sm:ml-1 sm:flex-row sm:items-center"
          >
            <p className="body-semibold text-dark300_light700">
              {author.name ?? "Anonymous"}
            </p>

            <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
              <span className="max-sm:hidden"> • </span>
              Answered {getPuplishTime(createdAt)}
            </p>
          </Link>
        </div>

        <div className="flex justify-end">
          <Suspense>
            <Votes
              upVotes={upvotes}
              downVotes={downvotes}
              hasVotedPromise={hasVotedPromise}
              targetId={_id}
              targetType="answer"
            />
          </Suspense>
        </div>
      </div>

      <Preview content={content} />
      {showReadMore && (
        <Link
          href={`/questions/${question}#answer-${_id}`}
          className="body-semibold relative z-10 font-space-grotesk text-primary-500"
        >
          <p className="mt-1">Read more...</p>
        </Link>
      )}
    </article>
  );
};

export default AnswerCard;
