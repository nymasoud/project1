

const express = require('express') 
const router = express.Router()

const userController = require('../controllers/usersController')


router.route('/')
    //get  should be for read       
    .get(userController.getAllUsers)
    //post  should be for create
    .post(userController.createNewUser)
    //patch  should be for update
    .patch(userController.updateUser)
    //delete  should be for delete
    .delete(userController.deleteUser)

module.exports = router
