import { model, models, Schema, Types , Document } from "mongoose";

export interface ICollection {
  question: Types.ObjectId;
  author: Types.ObjectId;
}

export interface ICollectionDoc extends ICollection, Document {}
const collectionSchema = new Schema<ICollection>({
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  author: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
});

const collection = models?.Collection || model("Collection", collectionSchema);

export default collection;
