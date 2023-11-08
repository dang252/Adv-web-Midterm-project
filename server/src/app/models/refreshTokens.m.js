import mongoose from "mongoose";

const refreshTokensSchema = mongoose.Schema({
  user_id: String,
  token: String,
});

const userModel = mongoose.model("refreshTokens", refreshTokensSchema);

export default userModel;
