import UserModel from '../models/UserModel.js';
import { hashPassword } from '../services/authService.js';

const UserController = {
    getUsers: async (req, res) => {
        try {
            const users = req.body.ids
                ? await UserModel.getUsersByIDs(req.body.ids)
                : await UserModel.getAllUsers();

            return res.json({
                message: 'User fetched successfully',
                data: { users },
            });
        } catch (error) {
            console.error(`[GET] User error: ${error.message}`);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    },

    createUser: async (req, res) => {
        try {
            await UserModel.createUser({
                name: req.body.name.trim(),
                surname: req.body.surname.trim(),
                email: req.body.email.trim(),
                username: req.body.username.trim(),
                password: await hashPassword(req.body.password),
                profile_picture_key: req.body.profile_picture_key,
                bio: req.body.bio.trim(),
                type: req.body.type,
            });

            return res.status(201).json({
                message: 'User created successfully',
                data: {},
            });
        } catch (error) {
            console.error(`[POST] User error: ${error.message}`);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    },

    updateUser: async (req, res) => {
        try {
            await UserModel.updateUser(req.params.id, {
                name: req.body.name.trim(),
                surname: req.body.surname.trim(),
                email: req.body.email.trim(),
                profile_picture_key: req.body.profile_picture_key,
                bio: req.body.bio.trim(),
                type: req.body.type,
            });

            return res.json({
                message: 'User updated successfully',
                data: {},
            });
        } catch (error) {
            console.error(`[PATCH] User error: ${error.message}`);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    },

    deleteUser: async (req, res) => {
        try {
            await UserModel.deleteUser(req.params.id);
            return res.status(204).end();
        } catch (error) {
            console.error('[DELETE] User error:', error.message);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    },
};

export default UserController;
