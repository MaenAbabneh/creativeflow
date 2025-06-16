import { model, models, Schema, Types } from "mongoose";

export interface IInteraction {
  actionId: Types.ObjectId;
  user: Types.ObjectId;
  actionType: string;
  action: string;
}

const InteractionSchema = new Schema<IInteraction>({
  actionId: { type: Schema.Types.ObjectId, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  actionType: { type: String, enum: ["answer", "question"]  ,required: true },
  action: { type: String, required: true },
});

const Interaction =
  models?.Interaction || model("Interaction", InteractionSchema);

export default Interaction;
