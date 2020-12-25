const mongoose = require('mongoose')
const validator = require('validator')

const Participants = mongoose.model('Participants', {

    position_name: {
        type: String, 
        unique: true,
        required: true, 
        lowercase: true
    },
    participants_details: [{
        participant_name: {
            type: String, 
            trim: true,
            lowercase: true,
            unique: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            vaidate(value) {
                if(!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
        about: {
            type: String, 
        },
        myPromises: [{ type: String, maxlength: 3}],
        myAchivements: [{ type: String, maxlength: 3 }],
        mySupportes: [{ type: String, maxlength: 3 }],
     }]

})

module.exports = Participants



// participant_name: String;
//         email: String;
//         about: String;
//         supporters: string[];
//         promises: string[];
//         achivements: string[];