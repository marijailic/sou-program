<template>
    <div>
        <div class="card">
            <div class="competition">
                <div class="competition-info">
                    <div class="d-flex justify-content-between">
                        <div>
                            <div class="competition-name">
                                {{ competitionData.name }} -
                                {{ formatDate(competitionData.start_date) }}
                            </div>
                            <div class="competition-description text-muted">
                                {{ competitionData.description }}
                            </div>
                        </div>
                    </div>
                    <div class="teams-section">
                        <ul class="p-0" v-if="competitionData.teams.length > 0">
                            <li
                                class="flex team-row mt-2"
                                v-for="team in competitionData.teams"
                                :key="team.id"
                            >
                                <div class="me-2">{{ team.name }}:</div>
                                <div
                                    v-if="team.team_members.length > 0"
                                    class="team-members"
                                >
                                    <span
                                        v-for="member in team.team_members"
                                        :key="member.id"
                                        class="bg-blue"
                                    >
                                        {{ member.username }}
                                    </span>
                                </div>
                                <div v-else class="no-members">
                                    Nema članova tima
                                </div>
                            </li>
                        </ul>
                        <div v-else>Nema timova</div>
                    </div>
                </div>
            </div>
            <div class="card-footer p-2 text-end">
                <button
                    @click="deleteCompetition(competitionData.id)"
                    class="delete-btn btn btn-primary"
                >
                    Izbriši
                </button>
                <button
                    class="edit-btn btn btn-primary"
                    @click="openEditCompetition"
                >
                    Uredi
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useStoreCompetition } from "@/stores/competition.store";
import editCompetition from "./editCompetition.vue";
import eventBus from "@/eventBus";

export default {
    name: "showCompetition",
    data() {
        return {
            editingTeamId: null,
        };
    },
    components: {
        editCompetition,
    },
    props: {
        competitionData: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const storeCompetition = useStoreCompetition();
        return { storeCompetition };
    },
    computed: {
        editingTeamData() {
            return (
                this.competitionData.teams.find(
                    (team) => team.id === this.editingTeamId
                ) || null
            );
        },
    },
    methods: {
        async deleteCompetition(idCompetition) {
            const isConfirmed = window.confirm(
                "Jeste li sigurni da želite izbrisati natjecanje?"
            );

            if (isConfirmed) {
                await this.storeCompetition.deleteCompetition(idCompetition);
            }
        },
        openEditCompetition() {
            const editCompetition = true;
            const editCompetitionID = this.competitionData.id;
            const editObj = {
                editCompetition,
                editCompetitionID,
            };
            eventBus.emit("editCompetition", editObj);
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = String(date.getUTCDate()).padStart(2, "0");
            const month = String(date.getUTCMonth() + 1).padStart(2, "0");
            const year = date.getUTCFullYear();

            return `${day}/${month}/${year}`;
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    margin-top: 1vw;
}
.competition {
    display: flex;
    padding: 1vw;
    align-items: center;
}
.competition-profile-image {
    width: 50px;
    height: 50px;
    margin-right: 1vw;
}
.competition-info {
    width: 100%;
}
.competition-name {
    text-align: left;
    color: rgb(33, 37, 41);
}
.competition-description {
    text-align: left;
    font-size: 14px;
}
.competition-actions {
    width: 100%;
}
.delete-btn {
    margin-right: 1vw;
}
.bg-blue {
    background-color: rgb(210, 231, 255);
    padding: 0.3em 0.6em;
    border-radius: 99px;
    line-height: 1.3;
}
.team-row {
    display: flex;
    align-items: center;
}

.team-name {
    flex: 1;
}

.team-members {
    flex: 2;
    display: flex;
    gap: 10px;
}

.no-members {
    flex: 2;
}

.card-footer {
    padding: 0.7vw;
    background-color: white;
}

.delete-team-btn {
    background-color: #ff5353;
}

.delete-team-btn:hover {
    background-color: #eb5f5f;
}
</style>
