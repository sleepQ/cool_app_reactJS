import { apiUrl } from '../../utils/helper_variables';


export const getMovies = () => {
    const url = `${apiUrl}movies`;

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
        .then(movies => ({ ok: true, movies }))
        .catch(error => ({ ok: false, error }));
};


export const postMovies = (movie) => {
    const url = `${apiUrl}movies`;

    const data = {
        name: movie.name,
        comment: movie.comment,
        notes: movie.notes,
        score: movie.score
    };

    const options = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.usertoken}`
        }),
        body: JSON.stringify(data),
    };

    return fetch(url, options)
        .then(res => res.ok
            ? res.json()
            : Promise.reject({
                statusCode: res.status,
                message: res.statusText,
            })
        )
        .then(movie => ({ ok: true, movie }))
        .catch(error => ({ ok: false, error }));
};
