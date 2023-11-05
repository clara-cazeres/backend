import Shows from "../models/Show.js";
import crearFiltroDB from "../utils/filtro-db.js"
import responseShows from "../response/responseShows.js";

export const getShows = (req, res, next) => {
    //valores por los que puedo filtrar 
    const filtroFecha = crearFiltroDB(req.query.fecha);

    const filtros = {};

    if (filtroFecha) {filtros.fecha = filtroFecha};

    Shows.find(filtros)
        .then((data) => {
            const shows = data.map((p) => new responseShows(p.fecha));
            console.log(shows);
            res.send(shows);
        })
        .catch((error) => {
            // el middleware envia el error asi que pongo unicamente next
            console.log(error);
            next(error);
        });
};
