import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="relative">
      {/* Header with animated gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 blur-3xl animate-pulse" />
        <h1 className="h1-bold text-dark100_light900 relative z-10">
          All Users
        </h1>
      </div>

      {/* Search and Filter Section */}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <div className="relative flex-1">
          <Skeleton className="h-14 w-full rounded-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-xl" />
        </div>
        <div className="relative">
          <Skeleton className="h-14 w-28 rounded-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-xl" />
        </div>
      </div>

      {/* Users Grid with Staggered Animation */}
      <div className="mt-12 grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={index}
            className="relative group"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Card Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300" />

            {/* Main Card */}
            <div className="relative bg-light-900 dark:bg-dark-200 rounded-2xl p-6 border border-light-700 dark:border-dark-400 hover:border-primary/20 transition-all duration-300 animate-fade-in">
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Skeleton className="h-20 w-20 rounded-full" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-purple-500/30 to-blue-500/30 rounded-full animate-pulse" />
                  {/* Online indicator skeleton */}
                  <Skeleton className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-light-900 dark:border-dark-200" />
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2 mb-4">
                <Skeleton className="h-5 w-3/4 mx-auto rounded-lg" />
                <Skeleton className="h-3 w-1/2 mx-auto rounded-lg" />
              </div>

              {/* Stats */}
              <div className="flex justify-between text-center mb-4">
                <div className="space-y-1">
                  <Skeleton className="h-6 w-8 mx-auto rounded" />
                  <Skeleton className="h-3 w-12 rounded" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-6 w-8 mx-auto rounded" />
                  <Skeleton className="h-3 w-12 rounded" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-6 w-8 mx-auto rounded" />
                  <Skeleton className="h-3 w-12 rounded" />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 justify-center mb-4">
                {[1, 2, 3].map((tag) => (
                  <Skeleton
                    key={tag}
                    className="h-6 w-12 rounded-full"
                    style={{
                      animationDelay: `${index * 100 + tag * 50}ms`,
                    }}
                  />
                ))}
              </div>

              {/* View Profile Button */}
              <Skeleton className="h-9 w-full rounded-lg" />

              {/* Floating particles effect */}
              <div
                className="absolute top-2 right-2 w-2 h-2 bg-primary/20 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              />
              <div
                className="absolute top-4 left-3 w-1 h-1 bg-purple-500/20 rounded-full animate-bounce"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-blue-500/20 rounded-full animate-bounce"
                style={{ animationDelay: "2s" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-10 flex justify-center">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <Skeleton
              key={page}
              className="h-10 w-10 rounded-lg"
              style={{
                animationDelay: `${page * 100}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
    </section>
  );
};

export default Loading;
