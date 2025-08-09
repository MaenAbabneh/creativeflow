import JobCard from "@/components/card/job-card";
import JobsFilter from "@/components/filter/jobfilter";
import Pagination from "@/components/pagination";
import {
  fetchCountries,
  fetchJobs,
  fetchLocation,
  fetchPopularJobs,
} from "@/lib/actions/job.action";
import { Job, RouteParams } from "@/types/global";

const Page = async ({ searchParams }: RouteParams) => {
  const { query, location, page } = await searchParams;
  const userLocation = await fetchLocation();

  // إذا لم يكن هناك استعلام بحث، اعرض الوظائف الشائعة
  const jobs =
    query || location
      ? await fetchJobs({
          query:
            `${query}, ${location}` || `Software Engineer in ${userLocation}`,
          page: page ?? 1,
        })
      : await fetchPopularJobs(userLocation);

  const countries = await fetchCountries();
  const parsedPage = parseInt(page ?? 1);

  console.log(jobs);

  return (
    <div className="w-full mt-11">
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2">
          <h1 className="h1-bold text-dark100_light900">Jobs</h1>
          {!query && !location && (
            <p className="paragraph-regular text-dark400_light700">
              🔥 Popular Jobs in {userLocation}
            </p>
          )}
        </div>
      </div>

      <div className="mt-11">
        <JobsFilter countriesList={countries} />
      </div>

      <section className="mt-12 flex flex-col gap-6">
        {jobs?.length > 0 ? (
          jobs
            ?.filter((job: Job) => job.job_title)
            .map((job: Job, index: number) => (
              <JobCard key={job.id || `job-${index}`} job={job} />
            ))
        ) : (
          <div className="background-light900_dark200 light-border shadow-light-100 dark:shadow-none flex min-h-[200px] w-full flex-col items-center justify-center rounded-xl border p-8">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="h3-bold text-dark200_light900 mb-2">
              No Jobs Found
            </h3>
            <p className="paragraph-regular text-dark200_light800 text-center max-w-md">
              Oops! We couldn&apos;t find any jobs at the moment. Please try
              different keywords or check back later.
            </p>
          </div>
        )}
      </section>

      {jobs?.length > 0 && (query || location) && (
        <div className="mt-10">
          <Pagination page={parsedPage} isNext={jobs?.length === 10} />
        </div>
      )}
    </div>
  );
};

export default Page;
