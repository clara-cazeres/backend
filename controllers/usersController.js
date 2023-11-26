import Users from "../models/User.js";

//Login

const getLogin = async(req, res) => {

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
};



//Sign Up

const postSignUp = async (req, res) => {
    const { username, password, email } = req.body;


    try {
        const existingUser = await Users.findOne({ username });
        if (existingUser) {
            return res.status(400).send("El usuario ya existe");
        }

        const newUser = new Users({
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



export { getLogin };
export { postSignUp };