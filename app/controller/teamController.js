const Teams = require("../models/Teams");
const Messages = require("../messages/messages");
const { default: mongoose } = require("mongoose");
const { saveTeam, findTeam } = require("../db/db");

//Get ALL Teams
const getAllTeams = async (req,res) => {
    try{
        const teams = await Teams.find({});
        res.status(200).json({
            data: teams,
            success: true,
            message: Messages.all_teams_retrieved,
            request:{
                method: req.method
            }
        });
    } catch (error) {
        console.log(error);
    };
};

//Get Team by ID
const getTeamById = async (req, res) => {
    const {id} = req.params;
    try {   
        findTeam(id)
        .then(team => {
            if(!team){
                console.log(team)
                return res.status(404).json({
                    message: Messages.team_not_found
                })
            }
            res.status(200).json({
                team: team,
                message: Messages.team_retrieved,
                success: true,
                request:{
                    method: req.method,
                    url: "http://localhost:3000/teams/" + id
                }
            })
        })
    }catch (err){
        res.status(500).json({
            error:{
                message: err.message
            }
        })
    }
};

//Create a Team
const createTeam = async (req,res) => {
    const id = new mongoose.Types.ObjectId();
    const name = req.body.name;
    const country = req.body.country;
    const players = req.body.players;
    try{
        const newTeam = new Teams({
            _id: id,
            name: name,
            country: country,
            players: players
        });

        saveTeam(newTeam)
        .then(
            res.status(200).json({
                success: true,
                message: Messages.team_created,
                request: {
                    method: req.method
                }
            })
        );
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

//Update Team by ID
const updateTeam = async (req, res) => {
    const {id} = req.params;
    try{
        const team = await Teams.findByIdAndUpdate(
            id,
            req.body,
            { new: true })
        .exec()
        .then(team => {
            if(!team){
                console.log(team);
                return res.status(404).json({
                    message: Messages.team_not_found
                })
            }
            res.status(200).json({
                data: team,
                success: true,
                message: Messages.team_updated,
                request:{
                    method: req.method,
                    url: "http://localhost:3000/teams/" + id
                }
            })
        })
    }catch(err){
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    }
};

//Delete Team by ID
const deleteTeam = async (req, res) => {
    const {id} = req.params;
    try{
        await Teams.deleteOne({_id: id})
        .exec()
        .then(result => {
            if(!result){
                console.log(result)
                return res.status(404).json({
                    message: Messages.team_not_found
                })
            }
            res.status(200).json({
                message: Messages.team_deleted,
                success: true,
                request:{
                    method: req.method,
                    url: "http://localhost:3000/teams/" + id
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
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam
};