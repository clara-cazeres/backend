
import mongoose from "mongoose";

const fotoSchema = new mongoose.Schema({
    url: String,
    showId: String, // Este es el ID del show asociado
});
let Fotos = mongoose.model("Foto", fotoSchema);

export default Fotos;