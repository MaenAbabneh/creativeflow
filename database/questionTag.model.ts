import { Document,model, models, Schema, Types  } from "mongoose";

export interface IQuestionTag {
  question: Types.ObjectId;
  tag: Types.ObjectId;
}

export interface IQuestionTagDoc extends IQuestionTag, Document {}
const questionTagSchema = new Schema<IQuestionTag>(
  {
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    tag: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
  },
  {
    timestamps: true,
  }
);

const TagQuestion =
  models?.QuestionTag || model<IQuestionTag>("QuestionTag", questionTagSchema);

export default TagQuestion;
