import TagsCard from "@/components/card/tags-card";
import { Preview } from "@/components/editor/preview";
import Metric from "@/components/metric";
import UserAvatar from "@/components/UserAvatar";
import ROUTES from "@/constants/routes";
import { getQuestion } from "@/lib/actions/qustion.action";
import { formatNumber, getPuplishTime } from "@/lib/utils";
import { RouteParams, Tags } from "@/types/global";
import { Link } from "lucide-react";
import { redirect } from "next/navigation";

const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  const { success, data: question } = await getQuestion({ questionId: id });

  if (!success || !question) return redirect("/404");

  const { title, content, tags, author, createdAt, answers, views } = question;

  return (
    <>
      <div className="flex-start w-full flex-col mt-8">
        <div className="flex w-full flex-col-reverse justify-between">
          <div className="flex items-center justify-start gap-1">
            <UserAvatar
              id={author._id}
              name={author.name}
              className="size-[22px]"
              fallbackClassName="text-[10px]"
            />
            <Link href={ROUTES.PROFILE(author._id)}>
              <p className="paragraph-semibold text-dark300_light700">
                {author.name}
              </p>
            </Link>
          </div>

          <div className="flex justify-end">
            <p>Votes</p>
          </div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full">
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
      <div className="w-full xl:w-[calc(100vw-320px-320px)] max-w-none overflow-hidden">
        <Preview content={content} />
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
    </>
  );
};

export default QuestionDetails;
