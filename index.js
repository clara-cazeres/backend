//importacion de librerias
import express from "express";
import dotenv from "dotenv";
import connectDB from "./utiles/db.js";
//import Usuarios from "./models/Usuario.js";
import bodyParser from "body-parser";
import cors from "cors";

import { mostrarDatosRequest } from './utiles/datosRequest.js';
import { manejarErrores } from './utiles/manejadorErrores.js';

const app = express();
app.use(express.json());
dotenv.config();
connectDB();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static("uploads"));

app.use(manejarErrores);
app.use(mostrarDatosRequest);

const port = process.env.PORT;


//definicion de endpoints

app.get("/", (req, res) => {
    res.send("Hello World");
});

import { getShows, getShowById } from './controllers/showsController.js';
app.get("/shows", getShows);
app.get("/shows/:customID", getShowById);


import { getNoticias, getNoticia } from "./controllers/noticiasController.js";
app.get("/noticias", getNoticias);
app.get("/noticias/:id", getNoticia);


import { getDiscos, getDisco } from "./controllers/discografiaController.js";
app.get("/discografia", getDiscos);
app.get("/discografia/:id", getDisco);



app.listen(port, () => {
    console.log(`App corriendo en puerto ${port}`)
});



import { postLogin, postSignUp } from "./controllers/usuarioController.js";

app.post("/usuario/login", postLogin);
app.post("/usuario/signup", postSignUp);


import Shows from "./models/Show.js";
//subir fotos kuartito

import upload from "./utiles/uploads.js";
app.post("/uploads-show-pic", (req, res, next) => {
    upload.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }

        const imageUrl = req.file.path;
        const showId = req.body.showId; 
        console.log("show id en uploads show pic:", showId)

        try {
            const show = await Shows.findOne({ customID: showId });
            if (show) {
                show.images.push(imageUrl);
                await show.save();
                res.send({ imageUrl });
            } else {
                res.status(404).send({ error: "Show no encontrado" });
            }    
        } catch (error) {
            console.error("Error al buscar o guardar el show:", error);
            res.status(500).send({ error: error.message });
        }
        
    });
});


app.get("/noticias-img", async (req, res) => {
    try {
        const { resources } = await cloudinary.api.resources({
            type: 'upload',
            prefix: 'fotos-noticias', 
            max_results: 50
        });

        const imageUrls = resources.map(resource => resource.url);
        res.send(imageUrls);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las imágenes');
    }
});




//comentarios kuartito

import Comentarios from "./models/Comentario.js";

app.post('/comentarios', (req, res) => {
    const comentarioTexto = req.body.comentario;
    const customShowId = req.body.showId; // Este es el customID del show

    const nuevoComentario = new Comentarios({
        texto: comentarioTexto,
        showId: customShowId // Guarda el customID del show
    });

    nuevoComentario.save()
        .then(() => res.status(200).json({ message: "Comentario guardado exitosamente" }))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/comentarios/:showId', async (req, res) => {
    try {
        const showId = req.params.showId;
        const comentarios = await Comentarios.find({ showId: showId })
            .sort({ createdAt: -1 })
            .limit(5); 
        res.json(comentarios);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
