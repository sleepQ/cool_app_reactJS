import moment from 'moment';
import jwt_decode from 'jwt-decode';

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

export function isUserLoggedIn() {
    const token = localStorage.usertoken || {};
    let decoded = {};

    try {
        decoded = jwt_decode(token);
    } catch (e) {
        return ({
            id: '',
            isLoggedIn: false
        });
    }

    return ({
        id: decoded.id,
        isLoggedIn: true
    });
}

export function invalidFileExtension(attachmentArr) {
    const validExtArr = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'pdf', 'tif'];

    return attachmentArr.find(item => {
        if (item) {
            const lowerCaseName = item.name.toLowerCase();
            const extension = lowerCaseName.substring(lowerCaseName.lastIndexOf('.') + 1);
            return !validExtArr.includes(extension);
        }
        return false
    });
}

export function invalidFileSize(attachmentArr) {
    return attachmentArr.find(item => {
        if (item) {
            return (item.size / 1024 / 1024) >= 5;
        }
        return false;
    });
}

export function composeAttachment(attachments) {
    let formData = new FormData();
    if (attachments && attachments.files) {
        for (let i = 0; i < attachments.files.length; i++) {
            formData.append('file', attachments.files[i]);
        }
        return formData;
    }
}
