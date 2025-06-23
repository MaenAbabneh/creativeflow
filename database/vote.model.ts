import { model, models, Schema, Types  } from "mongoose";

export interface IVote {
  author: Types.ObjectId;
  id: Types.ObjectId;
  type: string;
  voteType: string;
}

export interface IVoteDoc extends IVote, Document {}
const voteSchema = new Schema<IVote>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    id: { type: Schema.Types.ObjectId, required: true }, // This could be a reference to Question or Answer
    type: { type: String, enum: ["Question", "Answer"], required: true },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true },
  },
  {
    timestamps: true,
  }
);

const Vote = models?.Vote || model<IVote>("Vote", voteSchema);

export default Vote;
