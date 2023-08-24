<template>
    <a :href="{ mailHref }">{{ mailto }}</a>
</template>

<script>
export default {
    name: "EmailLink",
    data() {
        const mailto = process.env.VUE_APP_CONTACT_EMAIL;
        const subject = "Email from site";
        const subjcetURIEncoded = encodeURIComponent(subject);

        const mailHref = `mailto:${mailto}?subject=${subjcetURIEncoded}`;

        return {
            mailto,
            mailHref,
        };
    },
};
</script>

<style scoped></style>
