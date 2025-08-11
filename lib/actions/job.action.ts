export const fetchLocation = async () => {
  try {
    const response = await fetch("http://ip-api.com/json/?fields=country", {
      next: {
        revalidate: 3600, // 1 hour cache
        tags: ["location"],
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const location = await response.json();
    return location.country;
  } catch (error) {
    console.error("Error fetching location:", error);
    return "US"; // fallback
  }
};

export const fetchCountries = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name",
      {
        next: {
          revalidate: 86400, // 24 hours
          tags: ["countries"],
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};
export const fetchJobs = async (filters: JobFilterParams) => {
  const { query, page } = filters;

  const headers = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY ?? "",
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  };

  try {
    const response = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}`,
      {
        headers,
        next: {
          revalidate: 1800, // 30 minutes cache
          tags: ["jobs", `jobs-${encodeURIComponent(query)}`],
        },
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
};

// دالة للوظائف الشائعة
export const fetchPopularJobs = async (location?: string) => {
  const locationKey = location || "US";
  const searchQuery = `Software Engineer in ${locationKey}`;

  const headers = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY ?? "",
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  };

  try {
    const response = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${searchQuery}&page=1`,
      {
        headers,
        next: {
          revalidate: 3600, // 1 hour cache
          tags: ["popular-jobs", `popular-${locationKey}`],
        },
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
};

// دوال revalidation للتحكم في التخزين المؤقت
export const revalidateJobsCache = async () => {
  const { revalidateTag } = await import("next/cache");

  revalidateTag("jobs");
  revalidateTag("popular-jobs");
  revalidateTag("location");
  revalidateTag("countries");
};

export const revalidateJobsByQuery = async (query: string) => {
  const { revalidateTag } = await import("next/cache");
  revalidateTag(`jobs-${encodeURIComponent(query)}`);
};

export const revalidatePopularJobsByLocation = async (location: string) => {
  const { revalidateTag } = await import("next/cache");
  revalidateTag(`popular-${location}`);
};
