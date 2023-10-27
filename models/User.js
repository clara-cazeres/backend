import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
})

userSchema.plugin(mongooseUniqueValidator);

let Users = mongoose.model("User", userSchema);

export default Users;