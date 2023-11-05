import moment from 'moment-timezone';

const timezone = 'Europe/Amsterdam';

export const now = () => {
    return moment();
};

export const getCurrentDatetime = () => {
    return now().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
};
