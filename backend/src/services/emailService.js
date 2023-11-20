import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = ({ mailTo, subject, content }) => {
    const msg = {
        to: mailTo,
        from: process.env.SENDGRID_EMAIL_FROM,
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
            console.error(`Send email error: ${error}`);
        });
};

export { sendMail };
