import Noticias from "../models/Noticia.js";

const getNoticias = async (req, res) => {
    try {
        const noticias = await Noticias.find({});
        console.log(noticias);
        res.json(noticias);
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};

export { getNoticias };