import { unstable_cache } from "next/cache";

import { CACHE_CONFIG } from "@/lib/cache-config";

export const fetchLocation = unstable_cache(
  async () => {
    try {
      const response = await fetch("http://ip-api.com/json/?fields=country");
      const location = await response.json();
      return location.country;
    } catch (error) {
      console.error("Error fetching location:", error);
      return "US"; // fallback to US
    }
  },
  ["user-location"],
  {
    revalidate: CACHE_CONFIG.USER_LOCATION,
    tags: [CACHE_CONFIG.TAGS.LOCATION],
  }
);

export const fetchCountries = unstable_cache(
  async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name"
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching countries:", error);
      return [];
    }
  },
  ["countries-list"],
  {
    revalidate: CACHE_CONFIG.COUNTRIES,
    tags: [CACHE_CONFIG.TAGS.COUNTRIES],
  }
);

export const fetchJobs = async (filters: JobFilterParams) => {
  const { query, page } = filters;

  // إنشاء مفتاح فريد للتخزين المؤقت
  const cacheKey = `jobs-search-${encodeURIComponent(query)}-page-${page}`;

  return unstable_cache(
    async () => {
      const headers = {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY ?? "",
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      };

      try {
        const response = await fetch(
          `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}`,
          {
            headers,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.data || [];
      } catch (error) {
        console.error("Error fetching jobs:", error);
        return [];
      }
    },
    [cacheKey],
    {
      revalidate: CACHE_CONFIG.JOBS_SEARCH,
      tags: [CACHE_CONFIG.TAGS.JOBS],
    }
  )();
};

// دالة للحصول على الوظائف الشائعة مع تخزين مؤقت أطول
export const fetchPopularJobs = unstable_cache(
  async (location?: string) => {
    const searchQuery = `Software Engineer in ${location || "US"}`;

    const headers = {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY ?? "",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    };

    try {
      const response = await fetch(
        `https://jsearch.p.rapidapi.com/search?query=${searchQuery}&page=1`,
        {
          headers,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.data?.slice(0, 10) || []; // أفضل 10 وظائف
    } catch (error) {
      console.error("Error fetching popular jobs:", error);
      return [];
    }
  },
  ["popular-jobs"],
  {
    revalidate: CACHE_CONFIG.POPULAR_JOBS,
    tags: [CACHE_CONFIG.TAGS.JOBS, CACHE_CONFIG.TAGS.POPULAR],
  }
);

// دالة لحذف التخزين المؤقت للوظائف
export const revalidateJobsCache = async () => {
  const { revalidateTag } = await import("next/cache");
  revalidateTag(CACHE_CONFIG.TAGS.JOBS);
  revalidateTag(CACHE_CONFIG.TAGS.POPULAR);
};
