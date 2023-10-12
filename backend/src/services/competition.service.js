import db from "../db";

async function getPopulatedTeams(teams) {
    return await Promise.all(
        teams.map(async (team) => {
            const team_members = await db("team_member")
                .select(
                    "team_member.id",
                    "team_member.team_id",
                    "team_member.member_id",
                    "user.username"
                )
                .join("user", "team_member.member_id", "=", "user.id")
                .where("team_id", team.id);

            return {
                ...team,
                team_members,
            };
        })
    );
}

async function getPopulatedCompetitions(competitions) {
    return await Promise.all(
        competitions.map(async (competition) => {
            const teams = await db("team").where(
                "competition_id",
                competition.id
            );
            const populatedTeams = await getPopulatedTeams(teams);

            return {
                ...competition,
                teams: populatedTeams,
            };
        })
    );
}

export { getPopulatedTeams, getPopulatedCompetitions };
