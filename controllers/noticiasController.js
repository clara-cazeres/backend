import Noticias from "../models/Noticia.js";

const getNoticias = async (req, res) => {
    try {
        const noticias = await Noticias.find({});

        const noticiasConUrls = noticias.map(noticia => {
            let noticiaObj = noticia.toObject(); // Convierte el documento de MongoDB a un objeto JavaScript

            // Construye la URL completa para 'portada' y 'imagen' (si aplicable)
            noticiaObj.portada = `https://res.cloudinary.com/dflzegwev/image/upload/v1701030497/fotos-noticias/${noticia.portada}`;
            if (noticia.imagen) {
                noticiaObj.imagen = `https://res.cloudinary.com/dflzegwev/image/upload/v1701030497/fotos-noticias/${noticia.imagen}`;
            }
            console.log(noticiaObj.portada)
            return noticiaObj;
            
        });
        res.json(noticiasConUrls);
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};

const getNoticia = async (req, res) => {
    try {
        const noticia = await Noticias.findById(req.params.id);

        if (noticia) {
            // Convierte el documento de MongoDB a un objeto JavaScript
            let noticiaObj = noticia.toObject();

            // Construye la URL completa para 'portada' y 'imagen' (si aplicable)
            noticiaObj.portada = `https://res.cloudinary.com/dflzegwev/image/upload/v1701030497/fotos-noticias/${noticia.portada}`;
            if (noticia.imagen) {
                noticiaObj.imagen = `https://res.cloudinary.com/dflzegwev/image/upload/v1701030497/fotos-noticias/${noticia.imagen}`;
            }

            res.json(noticiaObj);
        } else {
            res.status(404).send('Noticia no encontrada');
        }
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};

export { getNoticias, getNoticia };

