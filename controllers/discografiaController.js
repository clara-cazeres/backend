import Discografia from "../models/Disco";

export const getDiscografia = async (req, res) => {
    try {
      const discografia = await Discografia.find();
      res.json(discografia);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la discografía" });
    }
  };