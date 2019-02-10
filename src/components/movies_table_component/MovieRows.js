import React from 'react';

const MovieRows = ({ movie, index, openModal, removeMovie, buttonIds }) => {
    const { name, score, comment, watchedAt, notes, id } = movie || {};
    const disableButton = buttonIds.has(id);
    const showButtonSpinner = buttonIds.get(id) === 'delete';

    return (
        <tr className="text-center">
            <td>{index}</td>
            <td>{name}</td>
            <td>{score}</td>
            <td>{comment}</td>
            <td>{watchedAt}</td>
            <td>{notes}</td>

            <td className="pl-0 pr-0">
                <button disabled={disableButton} className="btn btn-sm btn-primary pl-2 pr-2 mr-3" onClick={() => openModal(movie)}>
                    Edit
                </button>
                <button disabled={disableButton} className="btn btn-sm btn-secondary pl-2 pr-2" onClick={() => removeMovie(movie)}>
                    Delete {showButtonSpinner && <span className="spinner-border spinner-border-sm" aria-hidden="true" />}
                </button>
            </td>
        </tr>
    );
};

export default MovieRows;
