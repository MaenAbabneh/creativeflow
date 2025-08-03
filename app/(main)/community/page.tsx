import UserCard from "@/components/card/usercard";
import DataRender from "@/components/DataRender";
import CommonFilter from "@/components/filter/commonfilter";
import Pagination from "@/components/pagination";
import LocalSearch from "@/components/search/localsearch";
import { UserFilters } from "@/constants/filters";
import ROUTES from "@/constants/routes";
import { EMPTY_USERS } from "@/constants/states";
import { getAllUsers } from "@/lib/actions/users.action";
import { RouteParams } from "@/types/global";

export default async function Community({ searchParams }: RouteParams) {
  const { page, pagesize, query, filter } = await searchParams;

  const { success, data, error } = await getAllUsers({
    page: Number(page) || 1,
    pageSize: Number(pagesize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { users , isNext } = data || {};

  return (
    <div className="">
      <section className="flex flex-col-reverse sm:flex-row sm:items-center gap-6 justify-between mt-8 w-full">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </section>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.COMMUNITY}
          iconPosition="left"
          imgSrc="/icons/search.svg"
          placeholder="There are some great devs here!"
          otherClass="flex-1"
        />

        <CommonFilter
          filters={UserFilters}
          otherClasses="min-h-[50px] sm:min-w-[170px]"
        />
      </div>

      <DataRender
        success={success}
        data={users}
        error={error}
        empty={EMPTY_USERS}
        render={(users) => (
          <div className="mt-8 flex w-full flex-wrap gap-4 ">
            {users?.map((user) => <UserCard key={user._id} {...user} />)}
          </div>
        )}
      />
      <Pagination isNext={isNext} page={page} />
    </div>
  );
}
