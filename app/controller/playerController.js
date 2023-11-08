const Players = require("../models/Players");

const getAllPlayers = async (req, res) => {
    try {
        const players = await Players.find({})
        res.status(200).json({
            data: players,
            sucess: true, 
            message: `${req.method} - request to Player endpoint`});
    } catch (error){
        console.log(error);
    };
};

const getPlayerById = (req, res) => {
    const {id} = req.params;
    try {
        res.status(200).json({
            id,
            sucess: true,
            message: `${req.method} - request to Player by ID endpoint`
        });
    } catch(error) {
        console.log(error);
    };
};

const createPlayer = async (req, res) => {
    const { player } = req.body;
    try {
        const newPlayer = await Players.create(player);
        console.log("New Player Data>>>", newPlayer);
        res.status(200).json({
            sucess: true, 
            message: `${req.method} - request to Player endpoint`});
    } catch (error) {
        if (error.name == "ValidationError"){
            console.error("Error Validating!", error);
            res.status(422).json(error);
        } else {
            console.error(error);
            res.status(500).json(error);
        };
    };
};

const updatePlayer = async (req, res) => {
    const {id} = req.params;
    try {
        const player = await Players.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true });
        res.status(200).json({
            data: player,
            sucess: true,
            message: `${req.method} - request to Player by ID endpoint`
        });
    } catch (error) {
        console.log(error);
    };
};

const deletePlayer = async (req, res) => {
    const {id} = req.params;
    try {
        const player = await Players.findByIdAndDelete(
            id,
            { new: true }
        )
        res.status(200).json({
            data: player,
            sucess: true,
            message: `${req.method} - request to Player by ID endpoint`
        });
    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer
};