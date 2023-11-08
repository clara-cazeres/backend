import Shows from "../models/Show.js";

const getShows = async (req, res) => {
    try {
        let filtro = {};
        const tipo = req.query.tipo;
        const fechaActual = new Date();

        if (tipo === 'pasadas') {
            filtro.fecha = { $lt: fechaActual };
        } else if (tipo === 'proximas') {
            filtro.fecha = { $gt: fechaActual };
        }
        console.log(filtro);
        const shows = await Shows.find(filtro);
        console.log(shows);
        res.json(shows);
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};

export { getShows };

