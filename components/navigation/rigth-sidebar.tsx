import Image from "next/image";
import Link from "next/link";

import TagsCard from "@/components/card/tags-card";
import ROUTES from "@/constants/routes";

const RightSidebar = () => {
  const topQuestions = [
    { id: "1", question: "What is the best way to learn React?" },
    { id: "2", question: "How do I manage state in a React application?" },
    {
      id: "3",
      question:
        "What are the differences between functional and class components?",
    },
    { id: "4", question: "How can I optimize performance in a React app?" },
    { id: "5", question: "What is the purpose of keys in React lists?" },
  ];
  const popularTags = [
    { id: "1", name: "React", qustions: 120 },
    { id: "2", name: "JavaScript", qustions: 95 },
    { id: "3", name: "css", qustions: 80 },
    { id: "4", name: "HTML", qustions: 60 },
    { id: "5", name: "Next.js", qustions: 45 },
  ];

  return (
    <section className="light-border h-screen !background-light900_dark300  pt-5 pl-4 overflow-y-auto border-l border-light200_dark700 shadow-lg  dark:shadow-none rounded-lg custom-scrollbar hidden md:block">
      <div>
        <h2 className="h3-bold text-dark100_light900  mb-4 ">Top Questions</h2>
        <div className="flex w-[280px] flex-col  ">
          {topQuestions.map(({ id, question }) => {
            return (
              <Link
                href={ROUTES.PROFILE(id)}
                key={id}
                className="flex flex-row items-center gap-2 justify-between cursor-pointer  rounded-lg p-2 "
              >
                <p key={id} className="mt-1 body-medium text-dark100_light900">
                  {question}
                </p>
                <Image
                  src="/icons/chevron-right.svg"
                  alt="arrow-right"
                  width={16}
                  height={16}
                  className="invert-colors items-center mb- "
                />
              </Link>
            );
          })}
        </div>
        <div className="mt-5">
          <h3 className="h3-bold">Popular Tags</h3>
          <div className="mt-7 flex flex-col gap-4">
            {popularTags.map(({ id, name, qustions }) => (
              <TagsCard
                key={id}
                id={id}
                name={name}
                qustions={qustions}
                showCount={true}
                compact
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
