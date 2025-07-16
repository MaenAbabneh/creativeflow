interface SigninWithOauthParams {

    provider: github|google;
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

interface GetAnswerProps {
  questionId: string;
}

interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}

interface GetTagQuestionsParams extends Omit<PaginatedSearchParams, 'filter'> {
  tagId: string;
}