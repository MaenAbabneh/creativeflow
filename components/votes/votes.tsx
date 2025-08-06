"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { use, useState } from "react";
import { toast } from "sonner";

import { createVotes } from "@/lib/actions/vote.action";
import { formatNumber } from "@/lib/utils";
import { ActionResponse } from "@/types/global";

interface Props {
  upVotes: number;
  downVotes: number;
  hasVotedPromise: Promise<ActionResponse<HasVotedResponse>>;
  targetId?: string;
  targetType?: "question" | "answer";
}

function Votes({
  upVotes,
  downVotes,
  hasVotedPromise,
  targetId,
  targetType,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  const { success, data } = use(hasVotedPromise);

  const { hasDownvoted, hasUpvoted } = data || {};

  const handleVotes = async (voteType: "upvote" | "downvote") => {
    if (session.status !== "authenticated") {
      return toast.error("You need to be logged in to vote.", {
        description: "Please sign in to cast your vote.",
      });
    }
    setIsLoading(true);
    try {
      const result = await createVotes({
        targetId: targetId!,
        targetType: targetType!,
        voteType,
      });
      if (!result.success) {
        return toast.error("Failed to cast vote", {
          description: result.error?.message || "An unexpected error occurred.",
        });
      }
      toast.success(`Successfully ${voteType}d!`, {
        description: `Your ${voteType} has been recorded.`,
      });
    } catch {
      return toast.error("Failed to cast vote", {
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-2">
      <div className="flex-center">
        <Image
          src={
            success && hasUpvoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"
          }
          alt="upvote icon"
          width={20}
          height={20}
          className={`cursor-pointer`}
          aria-label="Upvote"
          onClick={() => !isLoading && handleVotes("upvote")}
        />
        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1 m-1">
          <p className="subtle-medium text-dark100_light900">
            {formatNumber(upVotes)}
          </p>
        </div>
      </div>

      <div className="flex-center">
        <Image
          src={
            success && hasDownvoted
              ? "/icons/downvoted.svg"
              : "/icons/downvote.svg"
          }
          alt="downvote icon"
          width={20}
          height={20}
          className={`cursor-pointer`}
          aria-label="Downvote"
          onClick={() => !isLoading && handleVotes("downvote")}
        />
        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1 m-1">
          <p className="subtle-medium text-dark100_light900">
            {formatNumber(downVotes)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Votes;
