import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
	firstname: String,
	lastname: String,
	username: { type: String, required: true, min: 6 },
	email: { type: String, required: true },
	password: { type: String, required: true, min: 8 },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
