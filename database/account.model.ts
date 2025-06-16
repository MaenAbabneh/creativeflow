import { model, models, Schema, Types } from "mongoose";

export interface IAccount {
  userId: Types.ObjectId;
  name: string;
  password?: string;
  image?: string;
  provider: string;
  providerAccountId: string;
}

const accountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    password: { type: String, required: false },
    image: { type: String, required: false },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
  },
  { timestamps: true }
);

const Account = models?.Account || model<IAccount>("Account", accountSchema);

export default Account;
