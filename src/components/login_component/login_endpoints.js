import { apiUrl } from '../../utils/helper_variables';

export const login = (user, signal) => {
    const url = `${apiUrl}users/login`;
    const data = {
        email: user.email,
        password: user.password
    };
    const options = {
        method: 'POST',
        signal,
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    };

    return fetch(url, options)
        .then(res => res.ok
            ? res.json()
            : Promise.reject({
                statusCode: res.status,
                message: res.statusText,
            })
        )
        .then(res => {
            const { token } = res || {};
            if (token && typeof token === 'string') {
                try {
                    localStorage.setItem('usertoken', token);
                } catch (error) {
                    return ({ ok: false, error });
                }

                return ({ ok: true, token });
            }
        })
        .catch(error => ({ ok: false, error }));
};
