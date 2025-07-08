import { RouteParams } from "@/types/global";

const QuestionDetails = async ({params} : RouteParams) => {
    const { id } = await params;

    return <div>Question {id}</div>

}

export default QuestionDetails;