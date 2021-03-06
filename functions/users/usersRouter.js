const express = require('express');
const Users = require('./usersModel.js');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        await req.data
            .collection('users')
            .doc(req.body.id)
            .set(req.body);
        res.status(200).json({
            error: false,
            message: 'The user was added.'
        });
    } catch (error) {
        res.status(500).json({
            error: false,
            message: 'The user could not be inserted.'
        });
    }
});

// Get all users request
router.get('/', async (req, res) => {
    try {
        const users = await Users.find(req.db);
        if (users.length) {
            res.status(200).json({
                error: false,
                message: 'The users were found successfully.',
                users
            });
        } else {
            res.status(404).json({
                error: true,
                message: 'The users could not be found.'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'There was an error finding the users.'
        });
    }
});

// Get users by id request
router.get('/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (user) {
            res.status(200).json({
                error: false,
                message: 'The user was found successfully.',
                user
            });
        } else {
            res.status(404).json({
                error: true,
                message: 'The user could not be found.'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'There was an error finding the user.'
        });
    }
});

// Update individual user request
router.put('/:id', async (req, res) => {
    if (!req.body) {
        return res.status(500).json({
            error: true,
            message: 'Please include information to upate and try again.'
        });
    }
    try {
        // Pull immutable version of user object from request
        const newUserInfo = Object.assign({}, req.body);

        // Find current user data
        const userObj = await Users.findById(req.params.id);

        // Update any included user information
        if (newUserInfo.firstName) userObj.firstName = newUserInfo.firstName;
        if (newUserInfo.lastName) userObj.lastName = newUserInfo.lastName;
        if (newUserInfo.accountType)
            userObj.accountType = newUserInfo.accountType;
        if (newUserInfo.githubID) userObj.githubID = newUserInfo.githubID;
        if (newUserInfo.cohortID) userObj.cohortID = newUserInfo.cohortID;

        // Insert new user object into database
        const user = await Users.update(req.params.id, newUserInfo);

        if (user) {
            res.status(200).json({
                error: false,
                message: 'The user was updated successfully.',
                user: userObj
            });
        } else {
            res.status(404).json({
                error: false,
                message: 'The user could not be updated.'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: false,
            message: 'There was an error updating the user.'
        });
    }
});

// Delete indiviudal user request
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await Users.remove(req.params.id);
        if (deletedUser) {
            res.status(200).json({
                error: false,
                message: 'User was deleted successfully.'
            });
        } else {
            res.status(404).json({
                error: true,
                message: 'The user could not be deleted.'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'There was an error while deleting the user.'
        });
    }
});

module.exports = router;
