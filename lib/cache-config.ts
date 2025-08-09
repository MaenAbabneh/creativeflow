// إعدادات التخزين المؤقت للوظائف
export const CACHE_CONFIG = {
  // مدة التخزين المؤقت بالثواني
  JOBS_SEARCH: 1800, // 30 دقيقة للبحث العادي
  POPULAR_JOBS: 3600, // 60 دقيقة للوظائف الشائعة
  COUNTRIES: 86400, // 24 ساعة لقائمة البلدان
  USER_LOCATION: 3600, // 60 دقيقة لموقع المستخدم

  // العلامات (Tags) لإدارة التخزين المؤقت
  TAGS: {
    JOBS: "jobs",
    POPULAR: "popular",
    COUNTRIES: "countries",
    LOCATION: "location",
  },
} as const;

// دالة لحساب وقت انتهاء التخزين المؤقت
export const getCacheExpiry = (seconds: number): Date => {
  return new Date(Date.now() + seconds * 1000);
};

// دالة للتحقق من صالحية التخزين المؤقت
export const isCacheValid = (expiryDate: Date): boolean => {
  return new Date() < expiryDate;
};
