import AllAnswers from "@/components/answers/allanswer";
import TagsCard from "@/components/card/tags-card";
import { Preview } from "@/components/editor/preview";
import AnswerForm from "@/components/forms/answerform";
import Metric from "@/components/metric";
import UserAvatar from "@/components/UserAvatar";
import Votes from "@/components/votes/votes";
import { getAnswers } from "@/lib/actions/answer.action";
import { getQuestion, incrementViews } from "@/lib/actions/qustion.action";
import { hasVoted } from "@/lib/actions/vote.action";
import { formatNumber, getPuplishTime } from "@/lib/utils";
import { RouteParams, Tags } from "@/types/global";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { Suspense} from "react";

const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const { success, data: question } = await getQuestion({ questionId: id });
  const {
    success: areAnswersLoaded,
    data: answersResult,
    error: answersError,
  } = await getAnswers({
    questionId: id,
    page: 1,
    pageSize: 10,
    filter: "latest",
  });

  const hasVotedPromise = hasVoted({
    targetId: question?._id,
    targetType: "question",
  });

  after(async () => {
    await incrementViews({ questionId: id });
  });

  if (!success || !question) return redirect("/404");

  const { title, content, tags, author, createdAt, answers, views } = question;

  return (
    <div className="w-full max-w-none">
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
              upVotes={question.upvotes}
              downVotes={question.downvotes}
              targetId={question._id}
              targetType="question"
              hasVotedPromise={hasVotedPromise}
            />
            </Suspense>
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
