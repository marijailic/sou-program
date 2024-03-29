import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { demosMiddleware } from '../middlewares/demosMiddleware';
import { Competitions, TeamMembers, Teams } from '../models/models';
import { getPopulatedCompetitions } from '../services/competitionService';
import { getCurrentDatetime } from '../services/datetimeService';

export const competitionRoutes = () => {
    const router = Router();

    router.get('/competition', authMiddleware, async (req, res) => {
        try {
            const competitions = await Competitions()
                .orderBy('timestamp', 'desc')
                .limit(10);

            return res.json({
                message: 'Competitions fetched successfully',
                data: await getPopulatedCompetitions(competitions),
            });
        } catch (error) {
            console.log('Error:', error);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    });

    router.delete(
        '/competition/:id',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            const idCompetition = req.params.id;

            try {
                await Competitions().where({ id: idCompetition }).del();
                return res.json({
                    message: 'Competition deleted successfully',
                    data: {},
                });
            } catch (error) {
                console.log('Error:', error);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }
        }
    );

    router.delete(
        '/competition/team/:id',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            const idTeam = req.params.id;

            try {
                await Teams().where({ id: idTeam }).del();
                return res.json({
                    message: 'Team deleted successfully',
                    data: {},
                });
            } catch (error) {
                console.log('Error:', error);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }
        }
    );

    router.delete(
        '/competition/team/member/:id',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            const idTeamMember = req.params.id;

            try {
                await TeamMembers().where({ id: idTeamMember }).del();
                return res.json({
                    message: 'Team member deleted successfully',
                    data: {},
                });
            } catch (error) {
                console.log('Error:', error);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }
        }
    );

    router.post(
        '/competition/team/member',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            const { team_id, member_id } = req.body;

            const teamMember = {
                team_id: team_id,
                member_id: member_id,
                timestamp: getCurrentDatetime(),
            };

            try {
                const teamId = await TeamMembers().insert(teamMember, 'id');
                return res.json({
                    message: 'Team member created successfully',
                    data: {
                        teamId: teamId,
                    },
                });
            } catch (error) {
                console.log('Error:', error);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }
        }
    );

    router.post(
        '/competition/team',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            const { competition_id, name } = req.body;

            const competition = await Competitions()
                .where('id', competition_id)
                .first();

            const team = {
                name: name,
                competition_id: competition.id,
                timestamp: getCurrentDatetime(),
            };

            try {
                const teamId = await Teams().insert(team, 'id');
                return res.json({
                    message: 'Team created successfully',
                    data: {
                        teamId: teamId,
                    },
                });
            } catch (error) {
                console.log('Error:', error);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }
        }
    );

    router.post(
        '/competition',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            const { name, description, start_date } = req.body;

            const competitionData = {
                name: name,
                description: description,
                start_date: start_date,
                timestamp: getCurrentDatetime(),
            };

            try {
                const competitionId = await Competitions().insert(
                    competitionData,
                    'id'
                );
                return res.json({
                    message: 'Competition created successfully',
                    data: {
                        competitionId: competitionId,
                    },
                });
            } catch (error) {
                console.log('Error:', error);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }
        }
    );

    router.patch(
        '/competition/team/:id',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            const idTeam = req.params.id;
            const { name } = req.body;

            try {
                await Teams().where({ id: idTeam }).update({ name: name });
                return res.json({
                    message: 'Team updated successfully',
                    data: {},
                });
            } catch (error) {
                console.log('Error:', error);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }
        }
    );

    router.patch(
        '/competition',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            const idCompetition = req.body.id;
            const { name, description, start_date } = req.body;

            try {
                await Competitions().where({ id: idCompetition }).update({
                    name: name,
                    description: description,
                    start_date: start_date,
                });
                return res.json({
                    message: 'Competition updated successfully',
                    data: {},
                });
            } catch (error) {
                console.log('Error:', error);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }
        }
    );

    return router;
};
