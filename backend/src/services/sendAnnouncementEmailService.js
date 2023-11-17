import db from '../db/connection.js';
import { sendMail } from './emailService.js';

export const sendAnnouncementToAllUsers = async (text) => {
    const emailObjArray = await db('user').select('email');
    const emails = emailObjArray.map((emailObj) => emailObj.email);

    function screwSendgrid(emails) {
        if (emails.length === 0) return;
        sendMail({
            mailTo: emails.shift(),
            subject: 'Nova obavijest na aplikaciji Šou program!',
            content: text,
        });
        screwSendgrid(emails);
    }

    screwSendgrid(emails);
};
