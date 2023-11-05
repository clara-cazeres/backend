import Discografia from "../models/Disco.js";
import crearFiltroDB from "../utils/filtro-db.js"

export const getDiscografia = (req, res, next) => {
    //valores por los que puedo filtrar 
    const filtroNombre = crearFiltroDB(req.query.nombre);

    const filtros = {};

    if (filtroNombre) {filtros.nombre = filtroNombre};

    Discografia.find(filtros)
        .then((data) => {

            const discografia = data.map((p) => new responseDiscografia(p.nombre));
            console.log(discografia);
            res.send(discografia);

        })
        .catch((error) => {
            // el middleware envia el error asi que pongo unicamente next
            console.log(error);
            next(error);
        });
};