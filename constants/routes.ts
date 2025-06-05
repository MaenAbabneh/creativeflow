const ROUTES = {
  HOME: "/",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
  PROFILE: (_id: string) => `/profile/${_id}`,
  TAGS: (_id: string) => `/tags/${_id}`,
  ASK_QUESTION: "/ask-question",
  QUESTION:(_id: string) => `/questions/${_id}`,
};

export default ROUTES;
