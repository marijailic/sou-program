const mailTo = process.env.VUE_APP_CONTACT_EMAIL
const subject = 'Email from site'
const subjcetURIEncoded = encodeURIComponent(subject)

const mailHref = `mailto:${mailTo}?subject=${subjcetURIEncoded}`

export default {
    mail: { mailHref, mailTo },
    discord: process.env.VUE_APP_URL_DISCORD,
    instagram: process.env.VUE_APP_URL_INSTAGRAM,
    linkedin: process.env.VUE_APP_URL_LINKEDIN,
    youtube: process.env.VUE_APP_URL_YOUTUBE,
    github: process.env.VUE_APP_URL_GITHUB,
}
