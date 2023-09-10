<template>
    <div class="mb-2">
        <form @submit.prevent="updateTeam">
            <div class="card">
                <div class="row">
                    <div class="d-flex align-items-center text-start">
                        <div class="card-right card-body text-start">
                            <label for="name">Naziv tima</label>
                            <input
                                v-model="teamName"
                                class="form-control"
                                type="text"
                                placeholder="Team Name"
                                required
                                id="name"
                            />
                            <h6 class="mt-2">Članovi tima:</h6>
                            <ul>
                                <li
                                    v-for="member in teamData.team_members"
                                    :key="member.id"
                                    class="mt-1"
                                >
                                    {{ member.username }}
                                    <button
                                        class="btn btn-danger ms-3"
                                        @click="removeMember(member.id)"
                                    >
                                        Remove
                                    </button>
                                </li>
                            </ul>
                            <select
                                v-model="selectedUserId"
                                class="form-control"
                            >
                                <option disabled value="">
                                    Odaberi novog člana
                                </option>
                                <option
                                    v-for="user in allUsers"
                                    :key="user.id"
                                    :value="user.id"
                                >
                                    {{ user.username }}
                                </option>
                            </select>
                            <button
                                class="btn btn-primary mt-2"
                                @click="addMember"
                            >
                                Dodaj člana
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <button type="submit" class="btn btn-primary">
                        Spremi tim
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useStoreCompetition } from "@/stores/competition.store";
import { useStoreUser } from "@/stores/user.store";
import { ref, onMounted } from "vue";

export default {
    name: "EditTeam",
    props: {
        teamData: {
            type: Object,
            required: true,
        },
        closeEdit: {
            type: Function,
            required: true,
        },
    },
    setup(props) {
        const storeCompetition = useStoreCompetition();
        const storeUser = useStoreUser();

        const teamName = ref(props.teamData.name);
        const selectedUserId = ref(""); // To store the selected user's ID
        const allUsers = ref([]); // To store all the users

        onMounted(async () => {
            allUsers.value = await storeUser.fetchUser();
        });

        return {
            teamData: props.teamData,
            storeCompetition,
            teamName,
            allUsers,
            selectedUserId,
        };
    },
    methods: {
        closeEdit() {
            this.closeEdit();
        },
        async updateTeam() {
            const id = this.teamData.id;
            const name = this.teamName;

            const updateData = {
                id,
                name,
            };

            if (name.trim() !== "") {
                await this.storeCompetition.updateTeam(updateData);
            }
        },
        async addMember() {
            if (this.selectedUserId) {
                try {
                    await this.storeCompetition.createMember({
                        team_id: this.teamData.id,
                        member_id: this.selectedUserId,
                    });
                } catch (error) {
                    console.error("Failed to create member:", error);
                }
                this.selectedUserId = "";
            }
        },
        async removeMember(memberId) {
            await this.storeCompetition.deleteMember(memberId);
        },
    },
};
</script>

<!-- Add your styles here -->
<style scoped>
.card {
    border: none;
    padding: 0;
    background-color: #f3f2f2;
    margin-top: 1vw;
}
.row {
    padding: 1vw;
}
.second-col {
    padding-left: 0;
}
.card-right {
    padding-left: 0;
}
.card-footer {
    padding: 0.7vw;
    background-color: #f3f2f2;
}
.profile-pic {
    width: 50px;
    height: 50px;
}
.escape-btn {
    margin-right: 1vw;
}
</style>
