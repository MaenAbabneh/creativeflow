import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="relative">
      {/* Back Navigation */}
      <div className="mb-6">
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      {/* Question Header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 blur-3xl animate-pulse" />
        <div className="relative z-10 space-y-4">
          <Skeleton className="h-12 w-full rounded-lg" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Question Stats */}
      <div className="flex gap-6 mb-8">
        {[1, 2, 3, 4].map((stat) => (
          <div key={stat} className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 w-12 rounded" />
          </div>
        ))}
      </div>

      {/* Question Content */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 rounded-2xl blur-sm" />
        <div className="relative bg-light-900 dark:bg-dark-200 rounded-2xl p-6 border border-light-700 dark:border-dark-400 animate-fade-in">
          <div className="space-y-4 mb-6">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <Skeleton className="h-4 w-4/5 rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3 rounded" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[1, 2, 3, 4].map((tag) => (
              <Skeleton key={tag} className="h-6 w-16 rounded-full" />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
            <Skeleton className="h-8 w-20 rounded" />
          </div>
        </div>
      </div>

      {/* Answers Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32 rounded" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>

        {/* Answer Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 rounded-2xl blur-sm" />
          <div className="relative bg-light-900 dark:bg-dark-200 rounded-2xl p-6 border border-light-700 dark:border-dark-400">
            <Skeleton className="h-6 w-32 rounded mb-4" />
            <Skeleton className="h-40 w-full rounded-lg mb-4" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        </div>

        {/* Existing Answers */}
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="relative group"
            style={{
              animationDelay: `${index * 150}ms`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-green-500/5 to-purple-500/5 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300" />

            <div className="relative bg-light-900 dark:bg-dark-200 rounded-2xl p-6 border border-light-700 dark:border-dark-400 hover:border-primary/20 transition-all duration-300 animate-fade-in">
              {/* Answer Header */}
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
              </div>

              {/* Answer Content */}
              <div className="space-y-3 mb-4">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-20 w-full rounded-lg" />
              </div>

              {/* Answer Actions */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
                <Skeleton className="h-6 w-16 rounded" />
              </div>

              {/* Floating particles */}
              <div
                className="absolute top-2 right-2 w-2 h-2 bg-blue-500/20 rounded-full animate-bounce"
                style={{ animationDelay: `${index * 0.5}s` }}
              />
            </div>
          </div>
        ))}
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
