//importacion de librerias
import express from "express";
import dotenv from "dotenv";
import connectDB from "./utiles.js/db.js";
import Users from "./models/User.js";
import bodyParser from "body-parser";
import cors from "cors";

import { mostrarDatosRequest } from './utiles.js/datosRequest.js';
import { manejarErrores } from './utiles.js/manejadorErrores.js';

const app = express();
app.use(express.json());
dotenv.config();
connectDB();
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}));
app.use(cors());

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


import { getDiscografia } from "./controllers/discografiaController.js";
app.get("/discografia", getDiscografia);


app.listen(port, () =>{
    console.log(`App corriendo en puerto ${port}`)
});


app.get("/users/login", async(req, res) => {

    Users.findOne({username: req.query.username})
    .then((user)=>{
        if (!user){
            res.status(404).send("Usuario no encontrado");
        } else{
            if (user.password === req.query.password){
            res.send(user);
        } else{
            res.status(401).send("Contraseña incorrecta");
        }
    }
    })
    .catch((err) => {
        res.status(500).send("Internal server error")
    })
});
