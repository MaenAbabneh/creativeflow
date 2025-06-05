import Link from "next/link";

import QuestionCard from "@/components/card/question-card";
import HomeFilter from "@/components/filter/homefilter";
import LocalSearch from "@/components/search/localsearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
const AskQuestion = [
  {
    _id: "1",
    title: "How to use Next.js?",
    description: "I am new to Next.js and need help getting started.",
    author: {
      _id: "author1",
      name: "John Doe",
      image:
        "https://media.gettyimages.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=gi&k=20&c=tC514mTG014_uspJnEeJeKrQDiBY2N9GFYKPqwmtBuo=",
    },
    createdAt: new Date(),
    tags: [
      { _id: "tag1", name: "Next.js" },
      { _id: "tag2", name: "React" },
    ],
    veiws: 150,
    upvotes: 20,
    answer: 5,
  },
  {
    _id: "2",
    title: "What is the best way to learn React?",
    description: "Looking for resources and tips to learn React effectively.",
    author: {
      _id: "author2",
      name: "Jane Smith",
      image:
        "https://media.gettyimages.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=gi&k=20&c=tC514mTG014_uspJnEeJeKrQDiBY2N9GFYKPqwmtBuo=",
    },
    createdAt: new Date(),
    tags: [
      { _id: "tag3", name: "React" },
      { _id: "tag4", name: "JavaScript" },
    ],
    veiws: 200,
    upvotes: 30,
    answer: 10,
  },
  {
    _id: "3",
    title: "How to deploy a Next.js application?",
    description: "Need guidance on deploying my Next.js app to production.",
    author: {
      _id: "author3",
      name: "Alice Johnson",
      image:
        "https://media.gettyimages.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=gi&k=20&c=tC514mTG014_uspJnEeJeKrQDiBY2N9GFYKPqwmtBuo=",
    },
    createdAt: new Date(),
    tags: [
      { _id: "tag5", name: "Next.js" },
      { _id: "tag6", name: "Deployment" },
    ],
    veiws: 100,
    upvotes: 15,
    answer: 8,
  },
  {
    _id: "4",
    title: "What are the differences between React and Vue?",
    description: "Comparing React and Vue for a new project.",
    author: {
      _id: "author4",
      name: "Bob Brown",
      image:
        "https://media.gettyimages.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=gi&k=20&c=tC514mTG014_uspJnEeJeKrQDiBY2N9GFYKPqwmtBuo=",
    },
    createdAt: new Date(),
    tags: [
      { _id: "tag7", name: "React" },
      { _id: "tag8", name: "Vue" },
    ],
    veiws: 250,
    upvotes: 40,
    answer: 12,
  },
];
interface searchParams {
  searchParams: Promise<{ [key: string]: string }>;
  filterParams: Promise<{ [key: string]: string }>;
}
export default async function App({
  searchParams,
  filterParams,
}: searchParams) {
  const { query = "", filter = "" } = await searchParams;
  const filterSeach = AskQuestion.filter(
    (qustion) =>
      qustion.title.toLowerCase().includes(query?.toLowerCase()) &&
      qustion.title.toLowerCase().includes(filter?.toLowerCase())
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
          <QuestionCard question={question} key={question._id} />
        ))}
      </section>
    </div>
  );
}
