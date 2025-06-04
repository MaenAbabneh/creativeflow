import Link from "next/link";

import HomeFilter from "@/components/filter/homefilter";
import LocalSearch from "@/components/search/localsearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
const AskQuestion = [
  {
    id: "1",
    title: "How to use Next.js?",
    description: "I am new to Next.js and need help getting started.",
  },
  {
    id: "2",
    title: "What is the best way to learn React?",
    description: "Looking for resources and tips to learn React effectively.",
  },
  {
    id: "3",
    title: "How to deploy a Next.js application?",
    description: "Need guidance on deploying my Next.js app to production.",
  },
  {
    id: "4",
    title: "What are the differences between React and Vue?",
    description: "Comparing React and Vue for a new project.",
  },
  {
    id: "5",
    title: "How to manage state in a React application?",
    description: "Looking for best practices for state management in React.",
  },
  {
    id: "6",
    title: "What is the purpose of keys in React lists?",
    description: "Understanding the importance of keys in React lists.",
  },
  {
    id: "7",
    title: "How to optimize performance in a React application?",
    description: "Tips for improving performance in React apps.",
  },
  {
    id: "8",
    title: "What is the role of Redux in state management?",
    description: "Exploring Redux for state management in React.",
  },
  {
    id: "9",
    title: "How to handle forms in React?",
    description: "Best practices for handling forms in React applications.",
  },
  {
    id: "10",
    title: "What are the benefits of using TypeScript with React?",
    description: "Advantages of integrating TypeScript with React projects.",
  },

];
interface searchParams {
  searchParams: Promise<{ [key: string]: string }>;
  filterParams: Promise<{ [key: string]: string }>;
}
export default async function App({ searchParams , filterParams }: searchParams) {
  const { query = "" , filter = "" } = await searchParams;
  const filterSeach = AskQuestion.filter((qustion) =>
    qustion.title.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <section className="flex flex-col-reverse sm:flex-row sm:items-center gap-6 justify-between mt-8">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button className=" primary-gradient-light dark:primary-gradient-dark px-6 py-6 rounded-md mt-4 sm:mt-0">
          <Link href={ROUTES.ASK_QUESTION}>
            <span className="body-semibold !text-white">Ask a Question</span>
          </Link>
        </Button>
      </section>
      <section className="mt-8">
        <LocalSearch
          placeholder="Search qustions ..."
          otherClass="w-[400px] sm:w-[600px]"
          imgSrc="/icons/search.svg"
          route="/"
        />
      </section>
      <section>
        <HomeFilter />
      </section>

      <section className="mt-8 min-h-[300px] w-[500px] ">
        {filterSeach.map((question) => (
          <div
            key={question.id}
            className="p-4 mb-4 background-light800_dark300 dark:bg-dark800 rounded-lg shadow-md"
          >
            <h2 className="text-lg font-semibold">{question.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {question.description}
            </p>
            <Link href={`/questions/${question.id}`} className="text-blue-500">
              View Details
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
