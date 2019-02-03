
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
