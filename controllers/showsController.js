import Shows from "../models/Show.js";

const getShows = async (req, res) => {
    try {
        const currentDate = new Date();
        const filter = req.query.filter;

        let query = {};

        if (filter === "pasadas") {
            query = { fecha: { $lt: currentDate } };
        } else if (filter === "proximas") {
            query = { fecha: { $gte: currentDate } };
        }

        const shows = await Shows.find(query);
        res.json(shows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un error al obtener los shows." });
    }
};

export { getShows };


