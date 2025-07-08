import { auth } from "@/auth";
import QuestionForm from "@/components/forms/questionform";
import ROUTES from "@/constants/routes";
import { redirect } from "next/navigation";

const AskQuestion = async () => {
  const session = await auth();
  if (!session) return redirect(ROUTES.SIGNIN);
  return (
    <>
      <div className="mt-8">
        <h1 className="h1-bold text-dark100_light900">Ask Question</h1>
      </div>
      <div className="mt-8">
        <QuestionForm />
      </div>
    </>
  );
};

export default AskQuestion;
