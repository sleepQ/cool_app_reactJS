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


export const postMovie = (movie) => {
    const url = `${apiUrl}movies`;
//movie.watchedAt
    const data = {
        name: movie.name,
        comment: movie.comment,
        notes: movie.notes,
        score: Number(movie.score),
        movieType: movie.movieType,
        movieStatus: movie.movieStatus
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
        .then(movies => ({ ok: true, movies }))
        .catch(error => ({ ok: false, error }));
};

export const updateMovie = (movie) => {
    const url = `${apiUrl}movies/${movie.id}`;
//movie.watchedAt
    const data = {
        name: movie.name,
        comment: movie.comment,
        notes: movie.notes,
        score: Number(movie.score),
        movieType: movie.movieType,
        movieStatus: movie.movieStatus
    };

    const options = {
        method: 'PUT',
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
        .then(movies => ({ ok: true, movies }))
        .catch(error => ({ ok: false, error }));
};

export const deleteMovie = (id) => {
    const url = `${apiUrl}movies/${id}`;

    const options = {
        method: 'DELETE',
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
