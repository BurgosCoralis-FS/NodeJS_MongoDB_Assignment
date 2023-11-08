const Teams = require("../models/Teams");

const getAllTeams = async (req,res) => {
    try{
        const teams = await Teams.find({});
        res.status(200).json({
            data: teams,
            success: true,
            message: "Teams have been retrieved"
        });
    } catch (error) {
        console.log(error);
    };
};

const getTeamById = (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).json({
            id,
            success: true,
            message: "Team has been retrieved"
        });
    } catch (error) {
        console.log(error);
    };
};

const createTeam = async (req,res) => {
    const { team } = req.body;
    try{
        const newTeam = await Teams.create(team);
        console.log("New Team Data:", newTeam);
        res.status(200).json({
            success: true,
            message: "Team has been successfully saved"
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

const updateTeam = async (req, res) => {
    const {id} = req.params;
    try{
        const team = await Teams.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true });
        res.status(200).json({
            data: team,
            success: true,
            message: "Team has been updated succesfully"
        });
    } catch (error) {
        console.log(error);
    };
};

const deleteTeam = async (req, res) => {
    const {id} = req.params;
    try{
        const team = await Teams.findByIdAndDelete(
            id,
            { new: true }
        )
        res.status(200).json({
            data: team,
            success: true,
            message: "Team has been deleted succesfully"
        });
    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam
};