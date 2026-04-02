import { Metadata } from "next";
import Link from "next/link";
import React from "react";

import QuestionCard from "@/components/card/question-card";
import DataRender from "@/components/DataRender";
import LocalSearch from "@/components/search/localsearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { EMPTY_QUESTION } from "@/constants/states";
import { getQuestionTag } from "@/lib/actions/tag.action";
import { RouteParams } from "@/types/global";

const OG_IMAGE =
  "https://res.cloudinary.com/djy5oyivn/image/upload/q_auto/f_auto/v1775140416/Creative-overflow-ezremove_atpzfv.png";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const { data } = await getQuestionTag({
    page: 1,
    pageSize: 1,
    query: "",
    tagId: id,
  });

  const tagName = data?.tag?.name || "Tag";
  const title = `Questions tagged with \"${tagName}\"`;
  const description = `Browse programming questions tagged with ${tagName} on Creative Overflow.`;
  const url = `/tags/${id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `Questions tagged with ${tagName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

const page = async ({ searchParams, params }: RouteParams) => {
  const { id } = await params;
  const { page, pagesize, query } = await searchParams;


  const { success, data, error } = await getQuestionTag({
    page: Number(page) || 1,
    pageSize: Number(pagesize) || 10,
    query,
    tagId: id,
  });

  const { questions, tag } = data || {};

  return (
    <div className="">
      <section className="flex flex-col-reverse sm:flex-row sm:items-center gap-6 justify-between mt-8 w-full">
        <div>
          <h1 className="h1-bold text-dark100_light900">
            {tag?.name
              ? `Questions tagged with "${tag.name}"`
              : "Tagged Questions"}
          </h1>
          {questions && questions.length > 0 && (
            <p className="text-dark400_light700 body-regular mt-2">
              {questions.length} question{questions.length !== 1 ? "s" : ""}{" "}
              found
            </p>
          )}
        </div>
        <div>
          <Link href={ROUTES.ASK_QUESTION} className="w-full sm:w-auto">
            <Button className="primary-gradient-light dark:primary-gradient-dark px-6 py-6 rounded-md mt-4 sm:mt-0 cursor-pointer w-full">
              <span className="body-semibold !text-white">Ask a Question</span>
            </Button>
          </Link>
        </div>
      </section>
      <section className="mt-8">
        <LocalSearch
          placeholder="Search questions in this tag..."
          otherClass="w-[400px] sm:w-[670px]"
          imgSrc="/icons/search.svg"
          route={`/tags/${id}`}
        />
      </section>

      <DataRender
        success={success}
        data={questions}
        error={error}
        empty={EMPTY_QUESTION}
        render={(questions) => (
          <div className="mt-8 min-h-[300px] w-full space-y-4">
            {questions?.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default page;
