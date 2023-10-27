import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import Users from "./models/User.js";

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () =>{
    console.log(`App corriendo en puerto ${port}`)
});


app.get("/users/login", async(req, res) => {
    console.log()
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
    .catch((error) => {
        res.status(500).send("Internal server error")
    })
});
