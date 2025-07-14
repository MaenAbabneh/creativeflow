const ROUTES = {
  HOME: "/",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
  ASK_QUESTION: "/ask-question",
  PROFILE: (id: string) => `/profile/${id}`,
  TAG: (id: string) => `/tags/${id}`,
  QUESTION:(id: string) => `/questions/${id}`,
  COLLECTION: '/collection',
  JOBS: '/jobs',
  TAGS: '/tags',
  COMMUNITY: '/community',
  SIGN_IN_WITH_OAUTH: 'signin-with-oauth',
};

export default ROUTES;
