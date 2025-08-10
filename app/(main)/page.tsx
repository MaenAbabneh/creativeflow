import Link from "next/link";

import QuestionCard from "@/components/card/question-card";
import DataRender from "@/components/DataRender";
import HomeFilter from "@/components/filter/homefilter";
import Pagination from "@/components/pagination";
import LocalSearch from "@/components/search/localsearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { EMPTY_QUESTION } from "@/constants/states";
import { getQuestions } from "@/lib/actions/qustion.action";

interface searchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
export default async function App({ searchParams }: searchParams) {
  const { page, pagesize, query, filter } = await searchParams;

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pagesize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { questions, isNext } = data || {};

  return (
    <div className="w-full max-w-5xl mx-auto">
      <section className="flex flex-col-reverse sm:flex-row sm:items-center gap-6 justify-between mt-8 w-full">
        <div>
          <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        </div>
        <div>
          <Link href={ROUTES.ASK_QUESTION} className="w-full sm:w-auto">
            <Button className=" primary-gradient-light dark:primary-gradient-dark px-6 py-6 rounded-md mt-4 sm:mt-0 cursor-pointer w-full">
              <span className="body-semibold !text-white">Ask a Question</span>
            </Button>
          </Link>
        </div>
      </section>
      <section className="mt-11 ">
        <LocalSearch
          placeholder="Search questions..."
          otherClass="flex-1 "
          imgSrc="/icons/search.svg"
          iconPosition="left"
          route={ROUTES.HOME}
        />
      </section>
      <section>
        <HomeFilter />
      </section>
      <DataRender
        success={success}
        data={questions}
        error={error}
        empty={EMPTY_QUESTION}
        render={(questions) => (
          <div className="mt-8 w-full space-y-4">
            {questions?.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        )}
      />
      <Pagination isNext={isNext} page={page} />
    </div>
  );
}
