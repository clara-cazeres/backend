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


const getDisco = async (req, res) => {
    try {
        const disco = await Discos.findById(req.params.id);
        res.json(disco);
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};

export { getDiscos, getDisco };