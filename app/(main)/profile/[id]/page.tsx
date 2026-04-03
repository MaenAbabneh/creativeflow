import dayjs from "dayjs";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import AnswerCard from "@/components/card/answer-card";
import QuestionCard from "@/components/card/question-card";
import TagsCard from "@/components/card/tags-card";
import DataRenderer from "@/components/DataRender";
import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserAvatar from "@/components/UserAvatar";
import ProfileLink from "@/components/users/profilelink";
import Stats from "@/components/users/stats";
import { EMPTY_ANSWERS, EMPTY_QUESTION, EMPTY_TAGS } from "@/constants/states";
import {
  getUserAnswers,
  getUserDetails,
  getUserQuestions,
  getUserStats,
  getUserTopTags,
} from "@/lib/actions/users.action";
import { RouteParams } from "@/types/global";

const OG_IMAGE =
  "https://res.cloudinary.com/djy5oyivn/image/upload/q_auto/f_auto/v1775140416/Creative-overflow-ezremove_atpzfv.png";
const PROFILE_DESCRIPTION_AR =
  "الملف الشخصي للمستخدم على كريتيف أوفرفلو مع المساهمات والأسئلة والإجابات.";

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { id } = await params;

  const { success, data } = await getUserDetails({
    userId: id,
  });
  if (!success || !data) {
    return {
      title: "User not found",
      description: "This user does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${data.user.name} (@${data.user.username})`;
  const description =
    data.user.bio?.slice(0, 155) ||
    `${PROFILE_DESCRIPTION_AR} View ${data.user.name}'s profile on Creative Overflow.`;
  const url = `/profile/${id}`;

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
      type: "profile",
      images: [
        {
          url: data.user.image || OG_IMAGE,
          width: 1200,
          height: 630,
          alt: data.user.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [data.user.image || OG_IMAGE],
    },
  };
}

const Profile = async ({ params, searchParams }: RouteParams) => {
  // /12312313
  const { id } = await params;
  // ?id=1&page=1&pageSize=10
  const { page, pageSize } = await searchParams;

  if (!id) notFound();

  const loggedInUser = await auth();

  const { success, data, error } = await getUserDetails({
    userId: id,
  });

  if (!success)
    return (
      <div>
        <div className="h1-bold text-dark100_light900">{error?.message}</div>
      </div>
    );

  const { user } = data!;

  const { data: userStats } = await getUserStats({ userId: id });

  const {
    success: userQuestionsSuccess,
    data: userQuestions,
    error: userQuestionsError,
  } = await getUserQuestions({
    userId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
  });

  const {
    success: userAnswersSuccess,
    data: userAnswers,
    error: userAnswersError,
  } = await getUserAnswers({
    userId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
  });

  const {
    success: userTopTagsSuccess,
    data: userTopTags,
    error: userTopTagsError,
  } = await getUserTopTags({
    userId: id,
  });

  const { questions, isNext: hasMoreQuestions } = userQuestions!;
  const { answers, isNext: hasMoreAnswers } = userAnswers!;
  const { tags } = userTopTags!;

  const { _id, name, image, portfolio, location, createdAt, username, bio } =
    user;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    description: bio || undefined,
    image,
    url: `https://creative-overflow.maenababneh.dev/profile/${_id}`,
    sameAs: portfolio ? [portfolio] : undefined,
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10 mt-11">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-2 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <UserAvatar
            id={_id}
            name={name}
            imageUrl={image}
            className="size-10 sm:size-15 lg:size-20 xl:size-25 rounded-full object-cover flex-shrink-0"
            fallbackClassName="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold"
          />

          <div className="flex-1 min-w-0">
            <h2 className="h2-bold text-dark100_light900 truncate">{name}</h2>
            <p className="paragraph-regular text-dark200_light800 mb-4 sm:mb-6">
              @{username}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-5">
              {portfolio && (
                <ProfileLink
                  imgUrl="/icons/link.svg"
                  href={portfolio}
                  title="Portfolio"
                />
              )}
              {location && (
                <ProfileLink imgUrl="/icons/location.svg" title={location} />
              )}
              <ProfileLink
                imgUrl="/icons/calendar.svg"
                title={dayjs(createdAt).format("MMMM YYYY")}
              />
            </div>

            {bio && (
              <p className="paragraph-regular text-dark400_light800 mt-4 sm:mt-6 line-clamp-3">
                {bio}
              </p>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 flex justify-start lg:justify-end">
          {loggedInUser?.user?.id === id && (
            <Link href="/profile/edite" className="w-full sm:w-auto lg:w-auto">
              <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-12 w-full sm:min-w-44 lg:min-w-36 xl:min-w-44 px-4 py-3 transition-all duration-200 hover:scale-105">
                Edit Profile
              </Button>
            </Link>
          )}
        </div>
      </section>

      <div className="w-full">
        <Stats
          totalQuestions={userStats?.totalQuestions || 0}
          totalAnswers={userStats?.totalAnswers || 0}
          badges={
            userStats?.badges || {
              GOLD: 0,
              SILVER: 0,
              BRONZE: 0,
            }
          }
          reputationPoints={user.reputation || 0}
        />
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
        <div className="xl:col-span-3">
          <Tabs defaultValue="top-posts" className="">
            <TabsList className="background-light700_dark300 min-h-[52px] p-1 gap-2 rounded-lg">
              <TabsTrigger
                value="top-posts"
                className="tab flex-1 sm:flex-initial"
              >
                Top Posts
              </TabsTrigger>
              <TabsTrigger
                value="answers"
                className="tab flex-1 sm:flex-initial"
              >
                Answers
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="top-posts"
              className="mt-5 flex w-full flex-col gap-4 sm:gap-6"
            >
              <DataRenderer
                data={questions}
                empty={EMPTY_QUESTION}
                success={userQuestionsSuccess}
                error={userQuestionsError}
                render={(questions) => (
                  <div className="flex w-full flex-col gap-4 sm:gap-6">
                    {questions.map((question) => (
                      <QuestionCard
                        key={question._id}
                        question={question}
                        showActionBtns={
                          loggedInUser?.user?.id === question.author._id
                        }
                        isProfilePage={true}
                      />
                    ))}
                  </div>
                )}
              />

              <Pagination page={page} isNext={hasMoreQuestions} />
            </TabsContent>

            <TabsContent
              value="answers"
              className="mt-5 flex w-full flex-col gap-4 sm:gap-6"
            >
              <DataRenderer
                data={answers}
                empty={EMPTY_ANSWERS}
                success={userAnswersSuccess}
                error={userAnswersError}
                render={(answers) => (
                  <div className="flex w-full flex-col gap-6 sm:gap-8 lg:gap-10">
                    {answers.map((answer) => (
                      <AnswerCard
                        key={answer._id}
                        {...answer}
                        content={answer.content.slice(0, 27)}
                        containerClasses="card-wrapper rounded-[10px] px-4 py-6 sm:px-7 sm:py-9 lg:px-11"
                        showReadMore
                        showActionBtns={
                          loggedInUser?.user?.id === answer.author._id
                        }
                        isProfilePage={true}
                      />
                    ))}
                  </div>
                )}
              />

              <Pagination page={page} isNext={hasMoreAnswers || false} />
            </TabsContent>
          </Tabs>
        </div>

        <aside className="xl:col-span-1 space-y-6">
          <div className="sticky top-6">
            <h3 className="h3-bold text-dark200_light900 mb-4">Top Tech</h3>
            <div className="space-y-3">
              <DataRenderer
                data={tags}
                empty={EMPTY_TAGS}
                success={userTopTagsSuccess}
                error={userTopTagsError}
                render={(tags) => (
                  <div className="space-y-3">
                    {tags.map((tag) => (
                      <TagsCard
                        key={tag._id}
                        _id={tag._id}
                        name={tag.name}
                        questions={tag.count}
                        showCount
                        compact
                      />
                    ))}
                  </div>
                )}
              />
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Profile;
