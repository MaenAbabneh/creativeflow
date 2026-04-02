import { Metadata } from "next";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { Suspense } from "react";

import AllAnswers from "@/components/answers/allanswer";
import TagsCard from "@/components/card/tags-card";
import { Preview } from "@/components/editor/preview";
import AnswerForm from "@/components/forms/answerform";
import Metric from "@/components/metric";
import SaveQuestion from "@/components/question/save-question";
import UserAvatar from "@/components/UserAvatar";
import Votes from "@/components/votes/votes";
import { getAnswers } from "@/lib/actions/answer.action";
import { hasSavedQuestion } from "@/lib/actions/collaction.action";
import { getQuestion, incrementViews } from "@/lib/actions/qustion.action";
import { hasVoted } from "@/lib/actions/vote.action";
import { formatNumber, getPuplishTime } from "@/lib/utils";
import { RouteParams, Tags } from "@/types/global";

const SITE_URL = "https://creative-overflow.maenababneh.dev";
const OG_IMAGE =
  "https://res.cloudinary.com/djy5oyivn/image/upload/q_auto/f_auto/v1775140416/Creative-overflow-ezremove_atpzfv.png";

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { id } = await params;

  const { success, data: question } = await getQuestion({ questionId: id });

  if (!success || !question) {
    return {
      title: "Question not found",
      description: "This question does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = question.content.slice(0, 155);
  const url = `/questions/${id}`;

  return {
    title: question.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: question.title,
      description,
      url,
      type: "article",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: question.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: question.title,
      description,
      images: [OG_IMAGE],
    },
  };
}

const QuestionDetails = async ({ params , searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pagesize, filter } = await searchParams;

  const { success, data: question } = await getQuestion({ questionId: id });

  if (!success || !question) return redirect("/404");

  const {
    success: areAnswersLoaded,
    data: answersResult,
    error: answersError,
  } = await getAnswers({
    questionId: id,
    page: Number(page) || 1,
    pageSize: Number(pagesize) || 10,
    filter,
  });

  const hasVotedPromise = hasVoted({
    targetId: question._id,
    targetType: "question",
  });

  const hasSavedPromise = hasSavedQuestion({
    questionId: question._id,
  });

  after(async () => {
    await incrementViews({ questionId: id });
  });

  const { title, content, tags, author, createdAt, answers, views } = question;

  const qaJsonLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: title,
      text: content,
      answerCount: answers,
      upvoteCount: question.upvotes,
      dateCreated: new Date(createdAt).toISOString(),
      author: {
        "@type": "Person",
        name: author.name,
      },
      suggestedAnswer:
        answersResult?.answers?.map((answer) => ({
          "@type": "Answer",
          text: answer.content,
          dateCreated: new Date(answer.createdAt).toISOString(),
          upvoteCount: answer.upvotes,
          author: {
            "@type": "Person",
            name: answer.author.name,
          },
          url: `${SITE_URL}/questions/${id}`,
        })) || [],
    },
  };

  return (
    <div className="w-full max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qaJsonLd) }}
      />
      <div className="flex-start w-full flex-col mt-8">
        <div className="flex w-full flex-col-reverse justify-between">
          <div className="flex items-center justify-start gap-1">
            <UserAvatar
              id={author._id}
              name={author.name}
              imageUrl={author.image}
              className="size-[30px]"
              fallbackClassName="text-[15px]"
              showName={true}
              nameClassName="paragraph-semibold text-dark300_light700"
            />
          </div>

          <div className="flex justify-end">
            <Suspense fallback={<div>Loading...</div>}>
              <Votes
                upvotes={question.upvotes}
                downvotes={question.downvotes}
                targetId={question._id}
                targetType="question"
                hasVotedPromise={hasVotedPromise}
              />
            </Suspense>
            <div className="ml-2 flex items-center justify-center">
            <Suspense fallback={<div>Loading...</div>}>
            <SaveQuestion questionId={question._id} hasSavedPromise={hasSavedPromise} />
            </Suspense>
            </div>
          </div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full break-words">
          {title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          image="/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getPuplishTime(new Date(createdAt))}`}
          title=""
          textStyles="small-regular text-dark400_light700"
        />
        <Metric
          image="/icons/message.svg"
          alt="message icon"
          value={answers}
          title=""
          textStyles="small-regular text-dark400_light700"
        />
        <Metric
          image="/icons/eye.svg"
          alt="eye icon"
          value={formatNumber(views)}
          title=""
          textStyles="small-regular text-dark400_light700"
        />
      </div>

      {/* Question Content - Responsive and contained */}
      <div className="w-full max-w-none overflow-hidden">
        <div
          className="prose prose-slate dark:prose-invert max-w-none 
                        w-full break-words overflow-wrap-anywhere"
        >
          <Preview content={content} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 items-center">
        {tags.map((tag: Tags) => (
          <TagsCard
            key={tag._id}
            _id={tag._id as string}
            name={tag.name}
            compact
          />
        ))}
      </div>
      {/* Answers Section */}
      <div className="mt-8">
        <AllAnswers
          page={Number(page) || 1}
          isNext={answersResult?.isNext || false}
          data={answersResult?.answers}
          success={areAnswersLoaded}
          error={answersError}
          totalAnswers={answersResult?.totalAnswers || 0}
        />
      </div>

      {/* Answer Form - Responsive container */}
      <section className="mt-8 w-full max-w-none">
        <div className="mb-6">
          <h3 className="h3-semibold text-dark200_light900">Your Answer</h3>
        </div>
        <AnswerForm
          questionId={id}
          questionTitle={question.title}
          questionContent={question.content}
        />
      </section>
    </div>
  );
};

export default QuestionDetails;
