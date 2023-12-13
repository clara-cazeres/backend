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

import { getShows } from './controllers/showsController.js';
app.get("/shows", getShows);

import { getNoticias } from "./controllers/noticiasController.js";
app.get("/noticias", getNoticias);


import { getDiscos } from "./controllers/discografiaController.js";
app.get("/discografia", getDiscos);

app.get('/discografia/:discoId', (req, res) => {
    const discoId = req.params.discoId;
    console.log(discoId);

    Discos.findById(discoId)
        .then(disco => {
            if (!disco) {
                res.status(404).json({ error: 'Disco no encontrado' });
            } else {
                res.json(disco);
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});




app.listen(port, () => {
    console.log(`App corriendo en puerto ${port}`)
});



import { postLogin, postSignUp } from "./controllers/usuarioController.js";

app.post("/usuario/login", postLogin);
app.post("/usuario/signup", postSignUp);

import upload from "./utiles/uploads.js";

app.post("/uploads-profile-pic", (req, res, next) => {

    upload.single("image")(req, res, (err) => {
        console.log("Archivo subido:", req.file);

        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.send({ imageUrl: req.file.path });
    })
});

app.get("/noticias-img", async (req, res) => {
    try {
        const { resources } = await cloudinary.api.resources({
            type: 'upload',
            prefix: 'fotos-noticias', // Reemplaza 'tu-carpeta' con el nombre de tu carpeta en Cloudinary
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
