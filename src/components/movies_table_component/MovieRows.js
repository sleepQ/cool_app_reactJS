import React from 'react';

const MovieRows = ({ movie, index, openModal, removeMovie, buttonIds }) => {
    const { name, score, comment, watchedDate = '/', notes, id } = movie || {};
    const disabledButton = buttonIds.has(id);

    return (
        <tr className="text-center">
            <td>{index}</td>
            <td>{name}</td>
            <td>{score}</td>
            <td>{comment}</td>
            <td>{watchedDate}</td>
            <td>{notes}</td>

            <td className="pl-0 pr-0">
                <button disabled={disabledButton} className="btn btn-sm btn-primary pl-2 pr-2 mr-3" onClick={() => openModal(movie)}>
                    Edit
                </button>
                <button disabled={disabledButton} className="btn btn-sm btn-secondary pl-2 pr-2" onClick={() => removeMovie(movie)}>
                    Delete {disabledButton && <span className="spinner-border spinner-border-sm" aria-hidden="true" />}
                </button>
            </td>
        </tr>
    );
};

export default MovieRows;
