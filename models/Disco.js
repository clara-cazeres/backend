import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

let Schema = mongoose.Schema;

let discoSchema = new Schema({
    nombre: {type: String},
    fecha: {type: Date},
    tipo: {type: String},
    canciones: [{type: String}],
    portada: {type: String},
})

discoSchema.plugin(mongooseUniqueValidator);

let Discografia = mongoose.model("Disco", discoSchema);

export default Discografia;