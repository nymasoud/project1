

const User = require('../models/User')
const Note = require('../models/Note')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


// @desc GET all users
// @route GET /user
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // start by defining user, then we will wait, we use user module, find method, we chain select method which we say 'DO NOT Return password' with the rest of user data,
    // there is never reason to pass password to client, after we chain lean method,
    const users = await User.find().select('-password').lean()
    // then we check if we dont have user then 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found'})
    }
    res.json(users)
})



// @desc Create a new user
// @route POST /user
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    // we will recieve some data from frontend
    const { username, password, roles} = req.body
    //confirming data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({message: 'All fields are required'})
    }
    //check for duplicate data
    const duplicate = await User.findOne({ username}).lean().exec()

    if (duplicate) {
        // error 409:  conflict data error
        return res.json(409).json({message: 'Duplicate username'})
    }

    //Hash password (putting a password through a hashing algorithm (bcrypt, SHA, etc) to turn plaintext into an unintelligible series of numbers and letters)
    const hashedPwd = await bcrypt.hash(password, 10) //salt rounds
    
    const userObject = { username, "password":hashedPwd, roles}

    const user = await User.create(userObject)

    if (user){
        res.status(201).json({message: `New User ${username } created`})
    } else {
        res.status(400).json({message: 'Invalid user data received'})
    }
})


// @desc UPDATE an user
// @route PATCH /user
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password} = req.body

    //confirm data
    if (!id  || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean'){
        return res.status(400).json({message: 'All fields are required'})
    }

    const user = await User.findById(id).exec()
    
    if(!user){
        return res.status(400).json({message: 'user not found'})
    }

    //checking for duplicate
    const duplicate = await user.findOne({username}).lean().exec()
    //allow update to the original user
    if (duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message: 'Duplicate username'})
    }
    //updating our data
    user.username = username
    user.roles = roles
    user.active = active

    if (password){
        //Hash password
        user.password = await bcrypt.hash(password, 10) // salt round
    }

    const updateUser = await user.save() //if we request a lean data and return then we wont return save method which we called right there
    res.json({message: `${updateUser.username} update` })
})


// @desc DELETE an user
// @route DELETE /user
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.body

    if(!id) {
        return res.status(400).json({message: 'User ID Requested'})
    }

    const note = await Note.findOne({user: id}).lean().exec()
    
    if(note){
        return res.status(400).json({message: 'User has assgined notes'})
    }

    const user = await User.findById(id).exec()

    if (!user){
        return res.status(400).json({message: 'User Not Found'})
    }

    const result = await user.deleteOne()

    const reply  = `Username ${result.username} with ID ${result._id} deleted `

    res.json(reply)

})


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}