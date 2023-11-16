const Players = require("../models/Players");
const Teams = require("../models/Teams");

const savePlayer = async (newPlayer) => {
    return await newPlayer.save();
};


const findPlayer = async (id) => {
    return await 
    Players.findById(id)
    .select("_id name")
    .populate("team", "_id name")
    .exec();
};

const saveTeam = async (newTeam) => {
    return await newTeam.save();
};

const findTeam = async (id) => {
    return await 
    Teams.findById(id)
    .select("_id name country players")
    .populate("players", "_id name")
    .exec();
};

module.exports = { savePlayer, findPlayer, saveTeam, findTeam };