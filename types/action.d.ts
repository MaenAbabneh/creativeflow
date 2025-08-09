interface SigninWithOauthParams {
  provider: github | google;
  providerAccountId: string;
  user: {
    name: string;
    email: string;
    image: string;
    username: string;
  };
}

interface AuthCredentials {
  email: string;
  name: string;
  username: string;
  password: string;
}

interface createQuestionProps {
  title: string;
  content: string;
  tags: string[];
}

interface updateQuestionProps extends createQuestionProps {
  questionId: string;
}

interface GetQuestionsParams {
  questionId: string;
}

interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}

interface GetTagQuestionsParams extends Omit<PaginatedSearchParams, "filter"> {
  tagId: string;
}

interface IncrementViewsParams {
  questionId: string;
}

interface createAnswerParmas {
  content: string;
  questionId: string;
}

interface getAnswersParams extends PaginatedSearchParams {
  questionId: string;
}

interface createVotesParams {
  targetId: string;
  targetType: "question" | "answer";
  voteType: "upvote" | "downvote";
}

interface updateVotesParams extends createVotesParams {
  change: 1 | -1;
}

type HasVotedParams = Pick<CreateVoteParams, "targetId" | "targetType">;

interface HasVotedResponse {
  hasUpvoted: boolean;
  hasDownvoted: boolean;
}
interface CreateAddCollectionParams {
  questionId: string;
}

interface getUserDetails {
  userId: string;
}

interface getUserInfo extends PaginatedSearchParams {
  userId: string;
}

interface deleteQuestionParams {
  questionId: string;
}

interface deleteAnswerParams {
  answerId: string;
}

interface createInteractionParams {
  actionId: string;
  actionTarget: "answer" | "question";
  authorId: string;
  actions:
    | "view"
    | "upvote"
    | "downvote"
    | "bookmark"
    | "post"
    | "edit"
    | "delete"
    | "search";
}

interface UpdateReputationParams {
  interaction: IInteractionDoc;
  session: mongoose.ClientSession;
  performerId: string;
  authorId: string;
}

interface RecommendationParams {
  userId: string;
  query?: string;
  skip: number;
  limit: number;
}

interface JobFilterParams {
  query: string;
  page: string;
}

interface UpdateUserParams {
  name?: string;
  username?: string;
  email?: string;
  image?: string;
  password?: string;
}

interface GlobalSearchParams {
  query: string;
  type: string | null;
}