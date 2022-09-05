const mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');

const PetSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: [3, "The Pet Name must be at least 3 charecter"],
        unique: true,
        required: [
            true,
            "Pet Name is required"
        ]
    },
    type: {
        type: String,
        minlength: [3, "The Pet Type must be at least 3 charecter"],
        required: [
            true,
            "Pet Type is required"
        ]
    },
    desc: {
        type: String,
        minlength: [3, "The Description must be at least 3 charecter"],
        required: [
            true,
            "Description is required"
        ]
    },
    skill1: {
        type: String
    },
    skill2: {
        type: String
    },
    skill3: {
        type: String
    }
},
{timestamps : true }
);
PetSchema.plugin(uniqueValidator , {type: 'mongoose-unique-validator', message: 'This {PATH} is exists' });
module.exports = mongoose.model("Pet", PetSchema);