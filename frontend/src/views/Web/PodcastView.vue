<template>
    <div>
        <div class="row">
            <div class="col">
                <h1>
                    We have <u>project managers</u>, branding, web art directors
                    and <u>heads of production</u>
                </h1>
            </div>
        </div>

        <!-- Podcast -->
        <div class="row podcast-container">
            <div class="col-3 text-muted">Podcast</div>
            <div class="col-9">
                <div class="row">
                    <div class="col">
                        <h6 class="m-0">
                            <i>Jednom mjesečno snimanje.</i> We have
                            compl242324eted over 150 projects for digital
                            companies fromssionals, our team consists of: brand,
                            graphic, web and motion designers, illustrators,
                            copywriters, webflow–developers, producers and
                            project managers, branding, web art directors and
                            heads of production. And we are also proud of our 42
                            awards from Awwwards and Behance.
                        </h6>
                    </div>
                </div>

                <div class="row teams">
                    <div class="col-6 mt-5">
                        <div class="row">
                            <div class="col text-muted">01</div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <h4>Voditelj</h4>
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
                            <div class="col text-muted">02</div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <h4>Tehničar</h4>
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
                            <div class="col text-muted">03</div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <h4>Postprodukcija</h4>
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
                            <div class="col text-muted">04</div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <h4>Grafičar</h4>
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
            <div class="col-3 text-muted">Join Us</div>
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
import EducatorCalendar from "@/components/web/EducatorCalendar.vue";
import EmailLink from "@/components/web/EmailLink.vue";

export default {
    name: "Educators",
    components: {
        EducatorCalendar,
        EmailLink,
    },
};
</script>

<style scoped>
.join-container {
    margin: 128px 32px;
}

.title-container,
.podcast-container {
    margin: 32px 32px 128px 32px;
}

h1,
.title-container,
.podcast-container,
.join-container {
    max-width: 1200px;
}

.teams-container {
    margin: 100px 32px;
}

.teams {
    margin-top: 40px;
}

.teams > * {
    padding-right: 100px;
}

.text-muted {
    font-size: 0.85em;
}
</style>
