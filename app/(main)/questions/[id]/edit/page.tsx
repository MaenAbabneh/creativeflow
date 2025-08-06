import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import QuestionForm from "@/components/forms/questionform";
import ROUTES from "@/constants/routes";
import { getQuestion } from "@/lib/actions/qustion.action";
import { RouteParams } from "@/types/global";

const EditQuestion = async ({ params }: RouteParams) => {
  const { id } = await params;
  if (!id) return notFound();

  const session = await auth();
  if (!session) return redirect(ROUTES.SIGNIN);

  const {data : question , success } = await getQuestion({questionId:id});
  if(!success) return notFound();

  const authorId = question?.author?._id?.toString() || question?.author?.toString();

  if (authorId !== session?.user?.id) {
    return redirect(ROUTES.QUESTION(id));
  }
  return (
    <>
      <div className="mt-8">
        <h1 className="h1-bold text-dark100_light900">Edit A Question</h1>
      </div>
      <div className="mt-8">
        <QuestionForm question ={question} isEdit />
      </div>
    </>
  );
};

export default EditQuestion;
