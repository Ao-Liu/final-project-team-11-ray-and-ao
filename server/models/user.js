import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  isPro: {type: String},
  attended: {type: String},
  possession: {type: String},
  description: {type: String},
  imgurl: {type: String},
});

export default mongoose.model("User", userSchema);