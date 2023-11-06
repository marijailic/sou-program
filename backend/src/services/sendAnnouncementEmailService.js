import { Users } from '../models/models';
import { sendMail } from './emailService';

export const sendAnnouncementToAllUsers = async (text) => {
    const users = await Users().select('e_mail');
    const emails = users.map((user) => user.e_mail);

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
