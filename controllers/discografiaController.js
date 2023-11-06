import Discografia from "../models/Disco.js";

const getDiscografia = async (req, res) => {
    try {
        const discografia = await Discografia.find({});
        console.log(discografia);
        res.json(discografia);
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};

export { getDiscografia };