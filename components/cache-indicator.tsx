"use client";

import { useState } from "react";

interface CacheIndicatorProps {
  cacheKey: string;
  revalidateTime: number;
}

const CacheIndicator = ({ cacheKey, revalidateTime }: CacheIndicatorProps) => {
  const [showDetails, setShowDetails] = useState(false);

  if (process.env.NODE_ENV !== "development") {
    return null; // إخفاء في الإنتاج
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="background-light800_dark400 light-border shadow-light-100 dark:shadow-none flex items-center gap-2 rounded-lg border px-3 py-2 text-xs text-dark400_light700 hover:background-light700_dark300 transition-colors"
      >
        📊 Cache Info
      </button>

      {showDetails && (
        <div className="background-light900_dark200 light-border shadow-light-100 dark:shadow-none absolute bottom-full right-0 mb-2 w-64 rounded-lg border p-4 text-xs">
          <h4 className="font-semibold text-dark200_light900 mb-2">
            Cache Details
          </h4>
          <div className="space-y-2 text-dark400_light700">
            <div>
              <strong>Key:</strong> {cacheKey}
            </div>
            <div>
              <strong>Revalidate:</strong> {Math.floor(revalidateTime / 60)}{" "}
              minutes
            </div>
            <div>
              <strong>Status:</strong>
              <span className="ml-1 inline-block h-2 w-2 rounded-full bg-green-500"></span>
              Cached
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CacheIndicator;
