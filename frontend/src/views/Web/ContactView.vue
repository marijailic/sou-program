<template>
    <div>
        <div class="row">
            <div class="col">
                <h1 id="contact">Kontaktirajte nas na <EmailLink /></h1>
            </div>
        </div>
    </div>
</template>

<script>
import EmailLink from "@/components/Web/EmailLink.vue";

export default {
    name: "Contact",
    components: { EmailLink },
};
</script>

<style scoped>
h1#contact {
    font-size: 5rem;
    line-height: 1.5;
}
</style>
