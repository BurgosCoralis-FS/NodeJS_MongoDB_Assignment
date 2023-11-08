const teamRouter = require("express").Router();

const {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam
} = require("../controller/teamController");

teamRouter.get("/", getAllTeams);

teamRouter.get("/:id", getTeamById);

teamRouter.post("/", createTeam);

teamRouter.put("/:id", updateTeam);

teamRouter.delete("/:id", deleteTeam);

module.exports = teamRouter;