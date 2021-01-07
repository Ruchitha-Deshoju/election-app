const mongoose = require('mongoose')

const Positions = mongoose.model('Positions', {
    positions: {
        type: String, 
        unique: true, 
        require: true, 
        lowercase: true
    }
})


module.exports = Positions