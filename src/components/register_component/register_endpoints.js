import { apiUrl } from '../../utils/helper_variables';

export const register = newUser => {
    const url = `${apiUrl}users/register`;

    const data = {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password
    };

    const options = {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data),
        // credentials: 'same-origin'
    };

    return fetch(url, options)
        .then(res => res.ok
            ? res.json()
            : Promise.reject({
                statusCode: res.status,
                message: res.statusText,
            })
        )
        .then(res => ({ ok: true, res }))
        .catch(error => ({ ok: false, error }));
}