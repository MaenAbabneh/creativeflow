import Link from "next/link";
import QuestionCard from "@/components/card/question-card";
import HomeFilter from "@/components/filter/homefilter";
import LocalSearch from "@/components/search/localsearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import DataRender from "@/components/DataRender";
import { EMPTY_QUESTION } from "@/constants/states";
import { getSavedQuestions } from "@/lib/actions/collaction.action";

interface searchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
export default async function collection({ searchParams }: searchParams) {
  const { page, pagesize, query, filter } = await searchParams;

  const { success, data, error } = await getSavedQuestions({
    page: Number(page) || 1,
    pageSize: Number(pagesize) || 10,
    query: query || "",
    filter: filter || "",
  });
  

  const { Collection } = data || {};

 

  return (
    <div className="">
      <section className="flex flex-col-reverse sm:flex-row sm:items-center gap-6 justify-between mt-8 w-full">
        <div>
          <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
        </div>
        <div>
          <Link href={ROUTES.ASK_QUESTION} className="w-full sm:w-auto">
            <Button className=" primary-gradient-light dark:primary-gradient-dark px-6 py-6 rounded-md mt-4 sm:mt-0 cursor-pointer w-full">
              <span className="body-semibold !text-white">Ask a Question</span>
            </Button>
          </Link>
        </div>
      </section>
      <section className="mt-8">
        <LocalSearch
          placeholder="Search questions..."
          otherClass="text-base"
          imgSrc="/icons/search.svg"
          route={ROUTES.COLLECTION}
        />
      </section>
      <section>
        <HomeFilter />
      </section>
      <DataRender
        success={success}
        data={Collection}
        error={error}
        empty={EMPTY_QUESTION}
        render={(Collection) => (
          <div className="mt-8 min-h-[300px] w-full space-y-4">
            {Collection?.map((items) => (
              <QuestionCard key={items._id} question={items.question}/>
            ))}
          </div>
        )}
      />
    </div>
  );
}
