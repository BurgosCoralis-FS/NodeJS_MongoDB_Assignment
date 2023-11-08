const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    country: {
        type: String,
        required: [true, "Where is this team from?"],
        trim: true,
    }
},
{ timestamps: true });

module.exports = mongoose.model("Team", teamSchema);