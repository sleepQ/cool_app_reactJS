import { apiUrl } from './utils/helper_variables';

export const fetchUser = () => {
    const url = `${apiUrl}users`;

    const options = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.usertoken}`
        })
    };

    return fetch(url, options)
        .then(res => res.ok
            ? res.json()
            : Promise.reject({
                statusCode: res.status,
                message: res.statusText,
            })
        )
        .then(user => ({ ok: true, user }))
        .catch(error => ({ ok: false, error }));
};
