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
