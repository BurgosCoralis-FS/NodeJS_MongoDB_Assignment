const Players = require("../models/Players");
const Messages = require("../messages/messages");

const getAllPlayers = async (req, res) => {
    try {
        const players = await Players.find({})
        res.status(200).json({
            data: players,
            success: true, 
            message: Messages.all_players_retrieved,
            request:{
                method: req.method
            }});
    } catch (error){
        console.log(error);
    };
};

const getPlayerById = async (req, res) => {
    const {id} = req.params;
    try{
        await Players.findById(id)
        .select("name _id")
        .populate("team", "_id name")
        .then(player => {
            if(!player){
                console.log(player);
                return res.status(404).json({
                    message: Messages.player_not_found
                })
            }
            res.status(200).json({
                player: player,
                message: Messages.player_retrieved,
                success: true,
                request:{
                    method: req.method,
                    url: "http://localhost:3000/players/" + id
                }
            })
        })
        
    } catch(err){
        res.stauts(500).json({
            error: {
                message: err.message
            }
        })
    }
};

const createPlayer = async (req, res) => {
    const { player } = req.body;
    try {
        const newPlayer = await Players.create(player);
        console.log("New Player Data>>>", newPlayer);
        res.status(200).json({
            success: true, 
            message: Messages.player_created,
            request:{
                method: req.method
            }
        });
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
            { new: true })
        .exec()
        .then(player => {
            if(!player){
                console.log(player);
                return res.status(404).json({
                    message: Messages.player_not_found
                })
            }
            res.status(200).json({
                data: player,
                success: true,
                message: Messages.player_updated,
                request:{
                    method: req.method,
                    url: "http://localhost:3000/players/" + id
                }
            })
        })
    }catch (err){
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    }
};

const deletePlayer = async (req, res) => {
    const {id} = req.params;
    try{
        await Players.deleteOne({_id: id})
        .exec()
        .then(result => {
            if(!result){
                console.log(result)
                return res.status(404).json({
                    message: Messages.player_not_found
                })
            }
            res.status(200).json({
                message: Messages.player_deleted,
                success: true,
                request:{
                    method: req.method,
                    url: "http://localhost:3000/players/" + id
                }
            })
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
};

module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer
};