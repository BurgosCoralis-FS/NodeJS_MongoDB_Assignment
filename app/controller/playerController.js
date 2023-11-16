const Players = require("../models/Players");
const Messages = require("../messages/messages");
const { savePlayer, findPlayer } = require("../db/db");
const { default: mongoose } = require("mongoose");

//Get ALL players
const getAllPlayers = async (req, res) => {
    try {
        const players = await Players.find({})
        // .populate("team", "name")
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

//Get Player by ID
const getPlayerById = async (req, res) => {
    const {id} = req.params;
    try{
        findPlayer(id)
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
                });
            });
    } catch(err){
        res.stauts(500).json({
            error: {
                message: err.message
            }
        })
    }
};

//Create Player
const createPlayer = async (req, res) => {
    const id = new mongoose.Types.ObjectId();
    const name = req.body.name;
    const username = req.body.username;
    const age = req.body.age;
    const birthday = req.body.birthday;
    const team = req.body.team;
    const game = req.body.game;
    const role = req.body.role;
    const country = req.body.country;

    try {
        const newPlayer = new Players({
            _id: id,
            name: name,
            username: username,
            age: age,
            birthday: birthday,
            team: team,
            game: game,
            role: role,
            country: country
        });
        savePlayer(newPlayer)
        .then(
            res.status(200).json({
                success: true, 
                message: Messages.player_created,
                request:{
                    method: req.method
                }
            })
        )
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

//Update Player by ID
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

//Delete Player by ID
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