"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md mx-auto">
        {/* Animated Error Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 blur-3xl animate-pulse rounded-full" />
          <div className="relative bg-light-900 dark:bg-dark-200 rounded-full p-6 border border-light-700 dark:border-dark-400 inline-block">
            <AlertTriangle className="h-16 w-16 text-red-500 animate-bounce" />
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h2 className="h2-bold text-dark100_light900">
            Oops! Something went wrong
          </h2>
          <p className="text-dark500_light700 text-base leading-relaxed">
            We encountered an unexpected error while loading the community page.
            Don't worry, this happens sometimes!
          </p>

          {/* Error Details */}
          {process.env.NODE_ENV === "development" && (
            <details className="mt-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <summary className="cursor-pointer text-sm font-medium text-red-700 dark:text-red-400">
                View Error Details
              </summary>
              <pre className="mt-2 text-xs text-red-600 dark:text-red-300 overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>

          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link href="/community">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>

          <Button asChild variant="ghost" className="flex items-center gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
        </div>

        {/* Background decoration */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-500/10 rounded-full blur-2xl animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </div>
  );
}
