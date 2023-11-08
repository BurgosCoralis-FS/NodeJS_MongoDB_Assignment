const mongoose = require("mongoose");

const playersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You are required to have a Player"],
        trim: true,
        maxlength: [50, "The name is too long"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "What is this player's username?"],
        unique: true,
    },
    age: {
        type: Number,
        required: [true, "How old is this player?"],
    },
    birthday: {
        type: Date,
        required: [true, "When was this player born?"],
        trim: true
    },
    //reminder to create team first
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    },
    game:{
        type: [String],
        required: [true, "What game does this team play?"],
        enum: [
            "League of Legends",
            "Overwatch",
            "Rainbow 6 Siege",
            "Valorant",
        ],
    },
    role: {
        type: [String],
        required: false,
        enum: [
            "Tank",
            "DPS",
            "Support",
            "Top",
            "Jungle",
            "Mid",
            "ADC",
        ]
    },
    country: {
        type: String,
        required: [true, "Where is this player from?"],
        maxlength: [3, "Just the initials of the country"],
        trim: true,
    },
});

module.exports = mongoose.model("Player", playersSchema);