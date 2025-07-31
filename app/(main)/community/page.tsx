import UserCard from "@/components/card/usercard";
import DataRender from "@/components/DataRender";
import LocalSearch from "@/components/search/localsearch";
import ROUTES from "@/constants/routes";
import { EMPTY_USERS } from "@/constants/states";
import { getAllUsers } from "@/lib/actions/users.action";
import { RouteParams } from "@/types/global";

export default async function Community({searchParams}: RouteParams ) {
  
 const { page, pagesize, query, filter } = await searchParams;

  const { success, data, error } = await getAllUsers({
    page: Number(page) || 1,
    pageSize: Number(pagesize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { users } = data || {};

  return (
    <div className="">
      <section className="flex flex-col-reverse sm:flex-row sm:items-center gap-6 justify-between mt-8 w-full">
          <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </section>
      <section className="mt-8">
        <LocalSearch
          placeholder="Search users..."
          otherClass="text-base"
          imgSrc="/icons/search.svg"
          route={ROUTES.COMMUNITY}
        />
      </section>

      <DataRender
        success={success}
        data={users}
        error={error}
        empty={EMPTY_USERS}
        render={(users) => (
          <div className="mt-8 flex w-full flex-wrap gap-4 ">
            {users?.map((user) => (
              <UserCard key={user._id} {...user}  />
            ))}
          </div>
        )}
      />
    </div>
  );
}
