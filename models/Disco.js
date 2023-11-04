import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

let Schema = mongoose.Schema;

let discoSchema = new Schema({
    name: {type: String, required: true},
    lanzamiento: {type: Number},
    tipo: {type: String},
    canciones: {type: []},
    portada: {type: String},
})

discoSchema.plugin(mongooseUniqueValidator);

let Discografia = mongoose.model("Disco", discoSchema);

export default Discografia;