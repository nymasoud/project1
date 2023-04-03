//Notes are assigned to specific users
//Notes have a ticket #, title, note body, created & updated dates
//Notes are either OPEN or Completed
//this Note is related to Mongoose (a little bit different to user)


const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        default: true
    },
    completed: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
)

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})




module.exports = mongoose.model('Note', noteSchema)