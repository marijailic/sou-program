const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = ({ mailTo, subject, content }) => {
    const msg = {
        to: mailTo,
        from: 'souprogram.fipu@gmail.com',
        subject: subject,
        text: content,
        // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

export { sendMail };
