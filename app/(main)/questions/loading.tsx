import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="relative">
      {/* Header with animated gradient */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 blur-3xl animate-pulse" />
        <h1 className="h1-bold text-dark100_light900 relative z-10">
          All Questions
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

      {/* Questions List */}
      <div className="mt-10 space-y-6">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className="relative group"
            style={{
              animationDelay: `${index * 150}ms`,
            }}
          >
            {/* Card Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300" />

            {/* Main Question Card */}
            <div className="relative bg-light-900 dark:bg-dark-200 rounded-2xl p-6 border border-light-700 dark:border-dark-400 hover:border-primary/20 transition-all duration-300 animate-fade-in">
              {/* Question Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4 rounded-lg" />
                  <Skeleton className="h-4 w-1/2 rounded-lg" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="h-8 w-12 rounded" />
                  <Skeleton className="h-3 w-8 rounded" />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[1, 2, 3].map((tag) => (
                  <Skeleton
                    key={tag}
                    className="h-6 w-16 rounded-full"
                    style={{
                      animationDelay: `${index * 150 + tag * 50}ms`,
                    }}
                  />
                ))}
              </div>

              {/* Question Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-20 rounded" />
                    <Skeleton className="h-3 w-16 rounded" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-3 w-6 rounded" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-3 w-6 rounded" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-3 w-6 rounded" />
                  </div>
                </div>
              </div>

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
