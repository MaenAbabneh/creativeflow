import Link from "next/link";

import ROUTES from "@/constants/routes";
import { getPuplishTime } from "@/lib/utils";

import { Preview } from "@/components/editor/preview";
import UserAvatar from "../UserAvatar";
import { Answers } from "@/types/global";
import Votes from "../votes/votes";
import { hasVoted } from "@/lib/actions/vote.action";
import { Suspense } from "react";

const AnswerCard = ({
  _id,
  author,
  content,
  createdAt,
  upvotes,
  downvotes,
}: Answers) => {
  const hasVotedPromise = hasVoted({
    targetId: _id,
    targetType: "answer",
  });
  return (
    <article className="light-border border-b py-10">
      <span id={JSON.stringify(_id)} className="hash-span" />

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
    </article>
  );
};

export default AnswerCard;
