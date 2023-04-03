
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "Employee"
    }],
    active: {
        type: Boolean,
        default: true  //it should be immediately active without to send that data (new employee) to the API, any user is created, 
        //automatically is active
    }
})

module.exports = mongoose.model('User', userSchema)