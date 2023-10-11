const moment = require("moment-timezone");
const express = require("express");
const router = express.Router();

import db from "../db";
import { authMiddleware } from "../middlewares/auth.middleware";
import { demosMiddleware } from "../middlewares/demos.middleware";

const { getPopulatedCompetitions } = require("../services/competition.service");

router.get("/competition", authMiddleware, async (req, res) => {
    try {
        const competitions = await db("competition")
            .orderBy("timestamp", "desc")
            .limit(10);

        res.json({
            message: "Competitions fetched successfully",
            data: await getPopulatedCompetitions(competitions),
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.delete(
    "/competition/:id",
    [authMiddleware, demosMiddleware],
    async (req, res) => {
        const idCompetition = req.params.id;

        try {
            await db("competition").where({ id: idCompetition }).del();
            res.json({ message: "Competition deleted successfully", data: {} });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                message: "Internal server error",
                data: {},
            });
        }
    }
);

router.delete(
    "/competition/team/:id",
    [authMiddleware, demosMiddleware],
    async (req, res) => {
        const idTeam = req.params.id;

        try {
            await db("team").where({ id: idTeam }).del();
            res.json({ message: "Team deleted successfully", data: {} });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                message: "Internal server error",
                data: {},
            });
        }
    }
);

router.delete(
    "/competition/team/member/:id",
    [authMiddleware, demosMiddleware],
    async (req, res) => {
        const idTeamMember = req.params.id;

        try {
            await db("team_member").where({ id: idTeamMember }).del();
            res.json({ message: "Team member deleted successfully", data: {} });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                message: "Internal server error",
                data: {},
            });
        }
    }
);

router.post(
    "/competition/team/member",
    [authMiddleware, demosMiddleware],
    async (req, res) => {
        const { team_id, member_id } = req.body;

        const timezone = "Europe/Amsterdam";
        const timestamp = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

        const teamMember = {
            team_id: team_id,
            member_id: member_id,
            timestamp: timestamp,
        };

        try {
            const teamId = await db("team_member").insert(teamMember, "id");
            res.json({
                message: "Team member created successfully",
                data: {
                    teamId: teamId,
                },
            });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                message: "Internal server error",
                data: {},
            });
        }
    }
);

router.post(
    "/competition/team",
    [authMiddleware, demosMiddleware],
    async (req, res) => {
        const { competition_id, name } = req.body;

        const timezone = "Europe/Amsterdam";
        const timestamp = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

        const competition = await db("competition")
            .where("id", competition_id)
            .first();

        const team = {
            name: name,
            competition_id: competition.id,
            timestamp: timestamp,
        };

        try {
            const teamId = await db("team").insert(team, "id");
            res.json({
                message: "Team created successfully",
                data: {
                    teamId: teamId,
                },
            });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                message: "Internal server error",
                data: {},
            });
        }
    }
);

router.post(
    "/competition",
    [authMiddleware, demosMiddleware],
    async (req, res) => {
        const { name, description, start_date } = req.body;

        const timezone = "Europe/Amsterdam";
        const timestamp = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

        const competitionData = {
            name: name,
            description: description,
            start_date: start_date,
            timestamp: timestamp,
        };

        try {
            const competitionId = await db("competition").insert(
                competitionData,
                "id"
            );
            res.json({
                message: "Competition created successfully",
                data: {
                    competitionId: competitionId,
                },
            });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                message: "Internal server error",
                data: {},
            });
        }
    }
);

router.patch(
    "/competition/team/:id",
    [authMiddleware, demosMiddleware],
    async (req, res) => {
        const idTeam = req.params.id;
        const { name } = req.body;

        try {
            await db("team").where({ id: idTeam }).update({ name: name });
            res.json({
                message: "Team updated successfully",
                data: {},
            });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                message: "Internal server error",
                data: {},
            });
        }
    }
);

router.patch(
    "/competition",
    [authMiddleware, demosMiddleware],
    async (req, res) => {
        const idCompetition = req.body.id;
        const { name, description, start_date } = req.body;

        try {
            await db("competition").where({ id: idCompetition }).update({
                name: name,
                description: description,
                start_date: start_date,
            });
            res.json({
                message: "Competition updated successfully",
                data: {},
            });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                message: "Internal server error",
                data: {},
            });
        }
    }
);

module.exports = router;
