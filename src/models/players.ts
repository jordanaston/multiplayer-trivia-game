import { Schema, models, model } from "mongoose";

const PlayerSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { collection: "players" }
);

export default models.Player || model("Player", PlayerSchema);
