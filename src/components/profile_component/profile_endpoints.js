import { apiUrl } from '../../utils/helper_variables';

export const uploadUserImage = (data, signal) => {
    const url = `${apiUrl}users/avatar`;

    const options = {
        method: 'PUT',
        signal,
        body: data,
        headers: new Headers({
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

export const fetchStranger = (username) => {
    const url = `${apiUrl}users/${username}`;

    const options = {
        method: 'GET',
        headers: new Headers({
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
        .then(stranger => ({ ok: true, stranger }))
        .catch(error => ({ ok: false, error }));

};
