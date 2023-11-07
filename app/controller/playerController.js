const getAllPlayers = (req, res) => {
    res.status(200).json({
        sucess: true, 
        message: `${req.method} - request to Player endpoint`});
};

const getPlayerById = (req, res) => {
    const {id} = req.params;
    res.status(200).json({
        id,
        sucess: true,
        message: `${req.method} - request to Player by ID endpoint`
    });
};

const createPlayer = (req, res) => {
    res.status(200).json({
        sucess: true, 
        message: `${req.method} - request to Player endpoint`});
};

const updatePlayer = (req, res) => {
    const {id} = req.params;
    res.status(200).json({
        id,
        sucess: true,
        message: `${req.method} - request to Player by ID endpoint`
    });
};

const deletePlayer = (req, res) => {
    const {id} = req.params;
    res.status(200).json({
        id,
        sucess: true,
        message: `${req.method} - request to Player by ID endpoint`
    });
};

module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer
};