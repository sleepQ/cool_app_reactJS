import moment from 'moment';

export const urlTo = (url, payload = {}) => {
    const routes = {
        login: '/login',
        register: '/register',
        profile: '/profile',
        movies: '/movies'
    }

    return routes[url] || '/';
};

export function navUserName(username = '') {
    if (typeof username === 'string') {
        const len = username.length;
        if (len > 8) {
            return `${username.substring(0, 8)}...`;
        }
        return username;
    }
}

export function scoreChartColor(score = 0) {
    if (score > 0 && score <= 4) {
        return 'red';
    } else if (score > 4 && score <= 6) {
        return 'orange';
    } else if (score > 6 && score <= 10) {
        return 'blue';
    } else {
        return '';
    }
}

export function validBeforeToday(current) {
    return current.isBefore(moment(new Date()));
}
