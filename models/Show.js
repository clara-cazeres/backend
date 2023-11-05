import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

let Schema = mongoose.Schema;

let showSchema = new Schema({
    fecha: {type: Date},
    ciudad: {type: String},
    pais: {type: String},
    lugar: {type: String},
    entradas: {type: String},
})

showSchema.plugin(mongooseUniqueValidator);

let Shows = mongoose.model("Show", showSchema);

export default Shows;