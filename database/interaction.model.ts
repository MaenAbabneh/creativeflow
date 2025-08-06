import { Document, model, models, Schema, Types } from "mongoose";

import { InteractionActionEnums } from "@/constants";

export interface IInteraction {
  actionId: Types.ObjectId;
  user: Types.ObjectId;
  actionType: "answer" | "question";
  actions: string;
}

export interface IInteractionDoc extends IInteraction, Document {}
const InteractionSchema = new Schema<IInteraction>({
  actionId: { type: Schema.Types.ObjectId, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  actionType: { type: String, enum: ["answer", "question"], required: true },
  actions: { type: String, enum: InteractionActionEnums, required: true },
});

const Interaction =
  models?.Interaction || model("Interaction", InteractionSchema);

export default Interaction;
