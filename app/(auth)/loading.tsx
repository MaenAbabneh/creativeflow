import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="relative text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 blur-3xl animate-pulse" />
          <div className="relative z-10 space-y-4">
            <Skeleton className="h-12 w-32 mx-auto rounded-lg" />
            <Skeleton className="h-6 w-48 mx-auto rounded-lg" />
            <Skeleton className="h-4 w-64 mx-auto rounded" />
          </div>
        </div>

        {/* Auth Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 rounded-2xl blur-sm" />

          <div className="relative bg-light-900 dark:bg-dark-200 rounded-2xl p-8 border border-light-700 dark:border-dark-400 animate-fade-in space-y-6">
            {/* Social Auth Buttons */}
            <div className="space-y-3">
              {[1, 2].map((social) => (
                <div key={social} className="relative">
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-xl" />
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-px flex-1" />
              <Skeleton className="h-4 w-8 rounded" />
              <Skeleton className="h-px flex-1" />
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-16 rounded" />
                <div className="relative">
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-xl" />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded" />
                <div className="relative">
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-xl" />
                </div>
              </div>

              {/* Additional Field (for sign-up) */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded" />
                <div className="relative">
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-xl" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="relative">
              <Skeleton className="h-12 w-full rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-purple-500/30 to-blue-500/30 rounded-xl animate-pulse" />
            </div>

            {/* Footer Links */}
            <div className="text-center space-y-2">
              <Skeleton className="h-4 w-48 mx-auto rounded" />
              <Skeleton className="h-4 w-32 mx-auto rounded" />
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

        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </div>
  );
};

export default Loading;
