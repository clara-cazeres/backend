import Discos from "../models/Disco.js";

const getDiscos = async (req, res) => {
    try {
        const discos = await Discos.find({});
        console.log(discos);
        res.json(discos);
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};

export { getDiscos };