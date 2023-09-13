const db = require("../db");
const { sendMail } = require("../services/email.service");

const sendAnnouncements = async (text) => {
    const emailObjArray = await db.select("e_mail").from("user");
    const emails = emailObjArray.map((emailObj) => emailObj.e_mail);

    function screwSendgrid(emails) {
        if (emails.length === 0) return;
        sendMail({
            mailTo: emails.shift(),
            subject: "Nova obavijest na aplikaciji Šou program!",
            content: text,
        });
        screwSendgrid(emails);
    }

    screwSendgrid(emails);
};

export { sendAnnouncements };