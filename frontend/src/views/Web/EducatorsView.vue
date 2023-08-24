<template>
    <div>
        <!-- Title -->
        <div class="row">
            <div class="col text-center">
                <EducatorCalendar></EducatorCalendar>
            </div>
        </div>

        <!-- Teams -->
        <div class="row teams-container">
            <div class="col-3">Timovi</div>
            <div class="col-9">
                <div class="row">
                    <div class="col">
                        <h2>
                            We have completed over 150 projects for digital
                            companies from all over the world — from Australia
                            to California, from Sweden to South Africa.
                        </h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h6>
                            As a fully remote agency of more than 50 creative
                            professionals, our team consists of: brand, graphic,
                            web and motion designers, illustrators, copywriters,
                            webflow–developers, producers and project managers,
                            branding, web art directors and heads of production.
                            And we are also proud of our 42 awards from Awwwards
                            and Behance.
                        </h6>
                    </div>
                </div>

                <div class="row teams">
                    <div class="col-6">
                        <div class="row">
                            <div class="col">01</div>
                        </div>
                        <div class="row mt-4">
                            <div class="col">
                                <h4>Edukatori</h4>
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

                    <div class="col-6">
                        <div class="row">
                            <div class="col">02</div>
                        </div>
                        <div class="row mt-4">
                            <div class="col">
                                <h4>Podcast</h4>
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
/* Debug */
_* {
    border: 1px solid red;
}

h1 {
    padding: 64px 32px;
}

h6 {
    margin-top: 2em;
}

img {
    width: 100%;
}

.about-container,
.join-container {
    margin: 128px 32px;
}

.teams-container {
    margin: 196px 32px;
}

h1,
.about-container,
.teams-container,
.join-container {
    max-width: 1200px;
}

.teams {
    margin-top: 88px;
}

.teams > * {
    padding-right: 100px;
}
</style>
