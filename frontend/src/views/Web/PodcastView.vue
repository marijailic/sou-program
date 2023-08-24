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

        <i> Dodati text za opis i navesti frekvenciju 1 mjesecno snimanje </i>
        <br />
        <i> Mozda opisati uloge </i>
        <br />
        <br />

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
.join-container {
    margin: 128px 32px;
}

.title-container {
    margin: 32px;
}

h1,
.title-container,
.join-container {
    max-width: 1200px;
}
</style>
