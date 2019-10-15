export const apiUrl = {
    'development': 'http://localhost:5000/',
}[process.env.NODE_ENV];

export const movieTypes = [
    'Movie',
    'TV-show'
];

export const movieStatuses = [
    'To-Watch',
    'Watched'
];

export const socketEvent = {
    ONLINE: 'ONLINE',
    PRIVATE_MESSAGE: 'PRIVATE_MESSAGE',
    DISCONNECT: 'DISCONNECT',
};
