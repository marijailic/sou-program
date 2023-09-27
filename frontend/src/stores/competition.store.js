import { defineStore } from "pinia";
import { getAuthHeaders } from "@/services/authService";

export const useStoreCompetition = defineStore("storeCompetition", {
    state: () => ({
        competition: [],
    }),
    getters: {
        getCompetitionById: (state) => (id) => {
            return state.competition.find(
                (competition) => competition.id === id
            );
        },
        getTeamById: (state) => (id) => {
            for (const competition of state.competition) {
                const foundTeam = competition.teams.find(
                    (team) => team.id === id
                );
                if (foundTeam) {
                    return foundTeam;
                }
            }
            return null;
        },
    },
    actions: {
        async fetchCompetition() {
            const res = await fetch(`${process.env.VUE_APP_URL}/competition`, {
                headers: getAuthHeaders(),
            });

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }

            const resObj = await res.json();
            this.competition = resObj.data;

            return resObj.data;
        },
        async deleteCompetition(idCompetition) {
            const res = await fetch(
                `${process.env.VUE_APP_URL}/competition/${idCompetition}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        ...getAuthHeaders(),
                    },
                }
            );

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },
        async createCompetition(competitionData) {
            const res = await fetch(`${process.env.VUE_APP_URL}/competition`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeaders(),
                },
                body: JSON.stringify(competitionData),
            });

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },
        async updateCompetition(updateData) {
            const res = await fetch(`${process.env.VUE_APP_URL}/competition`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeaders(),
                },
                body: JSON.stringify(updateData),
            });

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },
        async updateTeam(updateData) {
            const res = await fetch(
                `${process.env.VUE_APP_URL}/competition/team/${updateData.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        ...getAuthHeaders(),
                    },
                    body: JSON.stringify({ name: updateData.name }),
                }
            );

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },

        async createTeam(teamData) {
            const res = await fetch(
                `${process.env.VUE_APP_URL}/competition/team`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...getAuthHeaders(),
                    },
                    body: JSON.stringify(teamData),
                }
            );

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },

        async deleteTeam(teamId) {
            const res = await fetch(
                `${process.env.VUE_APP_URL}/competition/team/${teamId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        ...getAuthHeaders(),
                    },
                }
            );

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },

        async deleteMember(memberId) {
            const res = await fetch(
                `${process.env.VUE_APP_URL}/competition/team/member/${memberId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        ...getAuthHeaders(),
                    },
                }
            );

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },

        async createMember(memberData) {
            const res = await fetch(
                `${process.env.VUE_APP_URL}/competition/team/member`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...getAuthHeaders(),
                    },
                    body: JSON.stringify(memberData),
                }
            );

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },
    },
});
