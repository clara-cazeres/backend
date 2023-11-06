import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

let Schema = mongoose.Schema;

let noticiaSchema = new Schema({
    portada: {type: String},
    titulo: {type: String},
    fecha: {type: Date},
    extracto: {type: String},
    imagen: {type: String},
    texto: {type: String},
})

noticiaSchema.plugin(mongooseUniqueValidator);

let Noticias = mongoose.model("Noticia", noticiaSchema);

export default Noticias;