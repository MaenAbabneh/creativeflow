import TagsCard from "@/components/card/tags-card";
import DataRender from "@/components/DataRender";
import CommonFilter from "@/components/filter/commonfilter";
import Pagination from "@/components/pagination";
import LocalSearch from "@/components/search/localsearch";
import { TagFilters } from "@/constants/filters";
import ROUTES from "@/constants/routes";
import { EMPTY_TAGS } from "@/constants/states";
import { getTags } from "@/lib/actions/tag.action";
import { RouteParams } from "@/types/global";

export default async function tag({ searchParams }: RouteParams) {
  const { page, pagesize, query, filter } = await searchParams;

  const { success, data, error } = await getTags({
    page: Number(page) || 1,
    pageSize: Number(pagesize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { tags , isNext } = data || {};

  return (
    <div className="">
      <section className="flex flex-col-reverse sm:flex-row sm:items-center gap-6 justify-between mt-8 w-full">
        <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      </section>
      
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.TAGS}
          imgSrc="/icons/search.svg"
          placeholder="Search tags..."
          otherClass="flex-1"
        />

        <CommonFilter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <DataRender
        success={success}
        data={tags}
        error={error}
        empty={EMPTY_TAGS}
        render={(tags) => (
          <div className="mt-8 flex w-full flex-wrap gap-4 ">
            {tags?.map((tag) => <TagsCard key={tag._id} {...tag} />)}
          </div>
        )}
      />
      <Pagination isNext={isNext} page={page} />
    </div>
  );
}
