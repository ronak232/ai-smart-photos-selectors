import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  email: {
    type: String,
  },
  image:{
    type: String,
  }
});


export default mongoose.model("User", userSchema)