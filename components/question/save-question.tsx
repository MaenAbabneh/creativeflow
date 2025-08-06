"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import React, { use, useState } from "react";
import { toast } from "sonner";

import { addToCollection } from "@/lib/actions/collaction.action";
import { ActionResponse } from "@/types/global";

interface Props {
  questionId: string;
  hasSavedPromise?: Promise<ActionResponse<{ saved: boolean }>>;
  otherClassName?: string;
}

function SaveQuestion({ questionId, hasSavedPromise, otherClassName }: Props) {
  const session = useSession();
  const userId = session.data?.user?.id;

  const { data } = use(hasSavedPromise!);

  const { saved: hasSaved } = data || {};

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (isLoading) return;
    if (!userId) {
      return toast.warning("Login Required", {
        description: "You need to be logged in to save questions.",
      });
    }
    setIsLoading(true);

    try {
      const { error, success, data } = await addToCollection({ questionId });

      if (!success) {
        return toast.error("Failed to save question", {
          description: error?.message || "An unexpected error occurred.",
        });
      }

      toast.success(
        `Question ${data?.hasSaved ? "saved to" : "removed from"} your collection!`,
        {
          description: data?.hasSaved
            ? "Question saved to your collection."
            : "Question removed from your collection.",
        }
      );
    } catch {
      toast.error("Failed to save question", {
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${otherClassName}`}>
      <Image
        src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-red.svg"}
        alt="stars icon"
        width={20}
        height={20}
        className={`cursor-pointer ${isLoading && "opacity-50"}`}
        aria-label="Save question"
        onClick={async () => {
          handleSave();
        }}
      />
    </div>
  );
}

export default SaveQuestion;
