import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
})

usuarioSchema.plugin(mongooseUniqueValidator);

let Usuarios = mongoose.model("Usuario", usuarioSchema);

export default Usuarios;