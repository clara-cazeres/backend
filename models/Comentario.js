import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

let Schema = mongoose.Schema;

const comentarioSchema = new Schema({
    texto: {type: String},
    showId: {type: String}, // dsp lo asocio con el customID de mi show
    createdAt: {
        type: Date,
        default: Date.now
    }
});

comentarioSchema.plugin(mongooseUniqueValidator);

let Comentarios = mongoose.model('Comentario', comentarioSchema);

export default Comentarios;
