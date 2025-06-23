import { model, models, Schema , Document} from "mongoose";

export interface ITag {
  name: string;
  questions: number; // Assuming question is a reference to a Question model
}

export interface ITagDoc extends ITag, Document {}
const TagsSchema = new Schema<ITag>(
  {
    name: { type: String, required: true , unique: true },
    questions: { type: Number, default: 0 }, 
  },
  {
    timestamps: true,
  }
);

const Tag = models?.Tag || model<ITag>("Tag", TagsSchema);

export default Tag;
