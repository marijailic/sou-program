import moment from 'moment-timezone';

const TIMEZONE = 'Europe/Amsterdam';

export const now = () => {
    return moment();
};

export const getCurrentDatetime = () => {
    return now().tz(TIMEZONE).format('YYYY-MM-DD HH:mm:ss');
};
