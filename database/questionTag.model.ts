import { model, models, Schema, Types } from "mongoose";

export interface IQuestionTag {
  question: Types.ObjectId;
  tags: Types.ObjectId;
}

export interface IQuestionTagDoc extends IQuestionTag, Document {}
const questionTagSchema = new Schema<IQuestionTag>(
  {
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    tags: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
  },
  {
    timestamps: true,
  }
);

const questionTag =
  models?.QuestionTag || model<IQuestionTag>("QuestionTag", questionTagSchema);

export default questionTag;
