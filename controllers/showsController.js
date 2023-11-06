import Shows from "../models/Show.js";

const getShows = async (req, res) => {
    try {
        const shows = await Shows.find({});
        console.log(shows);
        res.json(shows);
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};

export { getShows };
