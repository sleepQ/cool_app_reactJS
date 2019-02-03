import React from 'react';

const MovieRows = ({ movie, idx }) => {
    const { name, score, comment, watchedDate = '/', notes } = movie;

    return (
        <tr>
            <td>{idx}</td>
            <td>{name}</td>
            <td>{score}</td>
            <td className="comment-overflow">{comment}</td>
            <td>{watchedDate}</td>
            <td>{notes}</td>
        </tr>
    );
};

export default MovieRows;
