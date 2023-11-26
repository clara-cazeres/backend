//importacion de librerias
import express from "express";
import dotenv from "dotenv";
import connectDB from "./utiles/db.js";
import Users from "./models/User.js";
import bodyParser from "body-parser";
import cors from "cors";

import { mostrarDatosRequest } from './utiles/datosRequest.js';
import { manejarErrores } from './utiles/manejadorErrores.js';

const app = express();
app.use(express.json());
dotenv.config();
connectDB();
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
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


app.listen(port, () =>{
    console.log(`App corriendo en puerto ${port}`)
});



import { getLogin, postSignUp } from "./controllers/usersController.js";

app.get("/users/login", getLogin);
app.post("/users/signup", postSignUp);

import upload from "./utiles/uploads.js";

app.post("/uploads-profile-pic", (req, res, next) => {

    upload.single("image")(req, res, (err) => {
        console.log("Archivo subido:", req.file);

        if(err) {
            return res.status(500).send({error: err.message});
        }
        res.send({ imageUrl: req.file.path});
    })
})