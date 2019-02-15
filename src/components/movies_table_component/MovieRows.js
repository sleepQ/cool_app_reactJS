import React from 'react';
import { movieTypes } from '../../utils/helper_variables';
import ScorePieChart from '../../shared_components/score_pie_chart_component/ScorePieChart';

const MovieRows = ({ movie, index, openModal, removeMovie, buttonIds }) => {
    const { name, score, comment, watchedAt, notes, id, movieType } = movie || {};
    const disableButton = buttonIds.has(id);
    const showButtonSpinner = buttonIds.get(id) === 'delete';
    //movieTypes[movieType]
    return (
        <tr className="text-center">
            <td className="overflow-hidden">{index}</td>
            <td className="overflow-hidden">{name}</td>

            <td className="px-2 py-1 overflow-hidden">
                <ScorePieChart score={score} />
            </td>

            <td className="overflow-hidden">{comment}</td>
            <td className="overflow-hidden">{watchedAt}</td>
            <td className="overflow-hidden">{notes}</td>

            <td className="px-0 py-3 overflow-hidden">
                <button disabled={disableButton} className="btn btn-sm btn-primary px-2 mr-3" onClick={() => openModal(movie)}>
                    Edit
                </button>
                <button disabled={disableButton} className="btn btn-sm btn-secondary px-2" onClick={() => removeMovie(movie)}>
                    Delete {showButtonSpinner && <span className="spinner-border spinner-border-sm" aria-hidden="true" />}
                </button>
            </td>
        </tr>
    );
};

export default MovieRows;
