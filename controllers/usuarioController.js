import Usuarios from "../models/Usuario.js";

//Login

const postLogin = async(req, res) => {
    Usuarios.findOne({username: req.body.username})
    .then((usuario)=>{
        if (!usuario){
            res.status(404).send("Usuario no encontrado");
        } else{
            if (usuario.password === req.body.password){
                res.send(usuario);
            } else{
                res.status(401).send("Contraseña incorrecta");
            }
        }
    })
    .catch((err) => {
        res.status(500).send("Error interno del servidor")
    })
};


//Sign Up

const postSignUp = async (req, res) => {
    const { username, password, email } = req.body;


    try {
        const existingUser = await Usuarios.findOne({ username });
        if (existingUser) {
            return res.status(400).send("El usuario ya existe");
        }

        const newUser = new Usuarios({
            username,
            password,
            email
        });

        await newUser.save();
        res.status(201).send(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error interno del servidor: ${err.message}`);
    }
};



export { postLogin };
export { postSignUp };