'use strict';

const UserController = require('./user-controller');
const Security = require('../security');
const ROLES = require('../security').ROLES;

const UserRouter = {

    register: (router) => {

        router
            .get('/users', Security.require([ROLES.users]), UserController.getUsersWebVersion)
            .post('/users', Security.require([ROLES.manager]), UserController.addUser);

        router.post('/users/signup', UserController.signupUser);

        router
            .get('/users/:id([0-9]+)', UserController.getUserById)
            .put('/users/:id([0-9]+)', Security.require([ROLES.users]), UserController.updateUser)
            .delete('/users/:id([0-9]+)', Security.require([ROLES.users]), UserController.deleteUserById);

        router
            .get('/users/:id([\\w%\\-]+)', UserController.getUserByReadableId);

        router
            .patch('/me', Security.requireLogin, UserController.patchMe)
            .post('/me', Security.requireLogin, UserController.getCurrentUser)

            .get('/web/users', UserController.getUsersWebVersion)

            .get('/kml/users', UserController.getUsersKmlVersion)

            .post('/users/:id/manager/:managerId', Security.requireLogin, UserController.assignManager)
            .post('/users/:id/manager', Security.requireLogin, UserController.promoteToManager)
            .post('/signin', UserController.signin)

            .get('/management', UserController.getManagement)

            .get('/skills/:id/users', UserController.getUsersBySkill)

            .post('/notify-change-password', UserController.prepareChangePassword)
            .post('/change-password', UserController.changePassword);
    },

    middleware: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            return UserController
                .getUserByToken(token)
                .then(user => {
                    if (user) {
                        req.body.user_id = user.id;
                        return UserController.findUserRolesById(user.id);
                    }
                    return null;
                })
                .then(roles => {
                    if (roles) {
                        req.body.user_roles = roles.map(r => r.name);
                    }
                    next();
                    return Promise.resolve();
                })
                .catch(next);
        }
        return next();
    }
};

module.exports = UserRouter;
