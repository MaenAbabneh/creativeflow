import { NextResponse } from "next/server";

interface Tags {
  _id: string;
  name: string;
  questions?: number;
}

interface Author {
  _id: string;
  name: string;
  image: string;
  email: string;
}

interface Questions {
  title: string;
  content: string;
  _id: string;
  tags: Tags[];
  author: Author;
  createdAt: Date;
  views: number;
  upvotes: number;
  downvotes:number;
  answers: number;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  statusCode?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };

type ErrorResponse = ActionResponse<undefined> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;

type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface Answers {
  _id: string;
  content: string;
  author: Author;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  question?: string;
}

interface Users {
  _id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  bio?: string;
  location?: string;
  portfolio?: string;
  status?: string;
  reputation?: number;
  createdAt: Date;
}

interface Collections {
  _id: string;
  question: Questions;
  author: string | Author;
}

interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

interface Interaction {
  actionId: string;
  user: Author;
  actionType: "answer" | "question";
  action:
    | "view"
    | "upvote"
    | "downvote"
    | "bookmark"
    | "post"
    | "edit"
    | "delete"
    | "search";
}

interface Badges {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

interface Job {
  id?: string;
  employer_name?: string;
  employer_logo?: string | undefined;
  employer_website?: string;
  job_employment_type?: string;
  job_title?: string;
  job_description?: string;
  job_apply_link?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
}

interface Country {
  name: {
    common: string;
  };
}

interface GlobalSearchedItem {
  id: string;
  type: "question" | "answer" | "user" | "tag";
  title: string;
}