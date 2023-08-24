<template>
    <div>
        <!-- Calendar -->
        <div class="row calendar-container">
            <div class="col text-center">
                <EducatorCalendar></EducatorCalendar>
            </div>
        </div>

        <!-- Branches -->
        <div class="row teams-container">
            <div class="col-3">Područja</div>
            <div class="col-9">
                <div class="row">
                    <div class="col">
                        <h2>
                            We have completed over 150 projects for digital
                            companies from all.
                        </h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h6>
                            As a fully remote agency of more than 50 creative
                            professionals, our team consists of: brand, graphic,
                            web and motion designers, illustrators, copywriters,
                            webflow
                        </h6>
                    </div>
                </div>

                <div class="row teams">
                    <div class="col-6 mt-5">
                        <div class="row">
                            <div class="col">01</div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <h4>Cyber Security</h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                For starters, we become immersed in your product
                                in order to realize who you are and what you
                                offer to your audience. Our team looks for a
                                deep understanding of your values and clearly
                                grasps the goals you pursue.
                            </div>
                        </div>
                    </div>

                    <div class="col-6 mt-5">
                        <div class="row">
                            <div class="col">02</div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <h4>Data Science</h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                As a fully remote agency of more than 50
                                creative professionals, our team consists of:
                                brand, graphic, web and motion designers,
                                illustrators, copywriters, webflow–developers,
                                producers and project managers, branding, web
                                art directors and heads of production.
                            </div>
                        </div>
                    </div>

                    <div class="col-6 mt-5">
                        <div class="row">
                            <div class="col">03</div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <h4>Software Engineering</h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                For starters, we become immersed in your product
                                in order to realize who you are and what you
                                offer to your audience. Our team looks for a
                                deep understanding of your values and clearly
                                grasps the goals you pursue.
                            </div>
                        </div>
                    </div>

                    <div class="col-6 mt-5">
                        <div class="row">
                            <div class="col">04</div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <h4>Data Structures and Algorithms</h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                As a fully remote agency of more than 50
                                creative professionals, our team consists of:
                                brand, graphic, web and motion designers,
                                illustrators, copywriters, webflow–developers,
                                producers and project managers, branding, web
                                art directors and heads of production.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Image -->
        <div class="row">
            <div class="col">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Aspect-ratio-16x9.svg/2560px-Aspect-ratio-16x9.svg.png"
                />
            </div>
        </div>

        <!-- Join us -->
        <div class="row join-container">
            <div class="col-3">Join Us</div>
            <div class="col-9">
                <div class="row">
                    <div class="col">
                        <h4>
                            We have compl242324eted over 150 projects for
                            digital companies from.
                            <router-link :to="'contact'">
                                Kontakt forma
                            </router-link>
                        </h4>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h6>As a fully remote agency of more <EmailLink /></h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EducatorCalendar from "@/components/Web/EducatorCalendar.vue";
import EmailLink from "@/components/Web/EmailLink.vue";

export default {
    name: "Educators",
    components: {
        EducatorCalendar,
        EmailLink,
    },
};
</script>

<style scoped>
.calendar-container {
    margin: 50px 0px;
}

.join-container {
    margin: 128px 32px;
}

.teams-container {
    margin: 100px 32px;
}

h1,
.teams-container,
.join-container {
    max-width: 1200px;
}

.teams {
    margin-top: 40px;
}

.teams > * {
    padding-right: 100px;
}
</style>
