import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="relative">
      {/* Profile Header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 blur-3xl animate-pulse" />
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="relative">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-purple-500/30 to-blue-500/30 rounded-full animate-pulse" />
            <Skeleton className="absolute bottom-2 right-2 h-6 w-6 rounded-full border-2 border-light-900 dark:border-dark-200" />
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-10 w-64 rounded-lg" />
              <Skeleton className="h-5 w-48 rounded-lg" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full max-w-md rounded" />
              <Skeleton className="h-4 w-3/4 max-w-sm rounded" />
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              {[1, 2, 3, 4].map((stat) => (
                <div key={stat} className="text-center space-y-1">
                  <Skeleton className="h-8 w-12 mx-auto rounded" />
                  <Skeleton className="h-3 w-16 rounded" />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Skeleton className="h-10 w-24 rounded-lg" />
              <Skeleton className="h-10 w-20 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="mb-8">
        <div className="flex gap-4 border-b border-light-700 dark:border-dark-400">
          {[1, 2, 3, 4].map((tab) => (
            <Skeleton key={tab} className="h-10 w-24 rounded-t-lg" />
          ))}
        </div>
      </div>

      {/* Profile Content */}
      <div className="space-y-6">
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

            {/* Content Card */}
            <div className="relative bg-light-900 dark:bg-dark-200 rounded-2xl p-6 border border-light-700 dark:border-dark-400 hover:border-primary/20 transition-all duration-300 animate-fade-in">
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-3/4 rounded-lg" />
                  <Skeleton className="h-4 w-1/2 rounded-lg" />
                </div>
                <Skeleton className="h-8 w-16 rounded" />
              </div>

              {/* Card Content */}
              <div className="space-y-3 mb-4">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[1, 2, 3].map((tag) => (
                  <Skeleton key={tag} className="h-6 w-16 rounded-full" />
                ))}
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-3 w-6 rounded" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-3 w-6 rounded" />
                  </div>
                </div>
                <Skeleton className="h-3 w-20 rounded" />
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
