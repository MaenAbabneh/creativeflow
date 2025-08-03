import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="relative">
      {/* Header with animated gradient */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 blur-3xl animate-pulse" />
        <h1 className="h1-bold text-dark100_light900 relative z-10">
          Ask a Question
        </h1>
      </div>

      {/* Question Form */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 rounded-2xl blur-sm" />

        <div className="relative bg-light-900 dark:bg-dark-200 rounded-2xl p-8 border border-light-700 dark:border-dark-400 animate-fade-in">
          {/* Form Fields */}
          <div className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 rounded" />
              <div className="relative">
                <Skeleton className="h-14 w-full rounded-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-xl" />
              </div>
              <Skeleton className="h-3 w-48 rounded" />
            </div>

            {/* Content/Description Field */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-40 rounded" />
              <div className="relative">
                <Skeleton className="h-40 w-full rounded-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-xl" />
              </div>
              <Skeleton className="h-3 w-56 rounded" />
            </div>

            {/* Tags Field */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-24 rounded" />
              <div className="relative">
                <Skeleton className="h-14 w-full rounded-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-xl" />
              </div>
              <Skeleton className="h-3 w-64 rounded" />

              {/* Tag Suggestions */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[1, 2, 3, 4, 5].map((tag) => (
                  <Skeleton
                    key={tag}
                    className="h-8 w-20 rounded-full"
                    style={{
                      animationDelay: `${tag * 100}ms`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Guidelines/Tips Section */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-36 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full rounded" />
                <Skeleton className="h-3 w-5/6 rounded" />
                <Skeleton className="h-3 w-4/5 rounded" />
                <Skeleton className="h-3 w-3/4 rounded" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <div className="relative flex-1">
                <Skeleton className="h-12 w-full rounded-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-purple-500/30 to-blue-500/30 rounded-xl animate-pulse" />
              </div>
              <Skeleton className="h-12 w-24 rounded-xl" />
            </div>
          </div>

          {/* Floating particles effect */}
          <div
            className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-8 left-6 w-1 h-1 bg-purple-500/20 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-blue-500/20 rounded-full animate-bounce"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </div>

      {/* Tips Sidebar */}
      <div className="mt-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 rounded-2xl blur-sm" />

        <div className="relative bg-light-900 dark:bg-dark-200 rounded-2xl p-6 border border-light-700 dark:border-dark-400">
          <Skeleton className="h-6 w-32 rounded mb-4" />

          <div className="space-y-3">
            {[1, 2, 3, 4].map((tip) => (
              <div key={tip} className="flex gap-3">
                <Skeleton className="h-5 w-5 rounded-full flex-shrink-0 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-3 w-3/4 rounded" />
                </div>
              </div>
            ))}
          </div>
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
