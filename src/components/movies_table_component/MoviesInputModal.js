import React, { Fragment } from 'react';
import { movieTypes, movieStatuses } from '../../utils/helper_variables';

class MoviesInputModal extends React.Component {

    render() {
        const { movieState, saveMovie, closeModal, updateField, buttonIds } = this.props;
        const { name, movieStatus, movieType, notes = '', id } = movieState || {};
        const score = movieState.score || '';
        const watchedAt = movieState.watchedAt || '';
        const comment = movieState.comment || '';

        const watched = movieStatuses[movieStatus] === 'Watched';
        const disableButton = buttonIds.has(id);
        const showButtonSpinner = buttonIds.get(id) === 'save';

        return (
            <div className="modal fade show" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Movie / TV-show</h5>
                            <button className="close" onClick={closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">

                            <div className="form-group">
                                <div className="form-check form-check-inline">
                                    <input id="Movie" className="form-check-input" type="radio" value={0} checked={movieType === 0} onChange={e => updateField(e, 'movieType')} />
                                    <label htmlFor="Movie" className="form-check-label">{movieTypes[0]}</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input id="TV-show" className="form-check-input" type="radio" value={1} checked={movieType === 1} onChange={e => updateField(e, 'movieType')} />
                                    <label htmlFor="TV-show" className="form-check-label">{movieTypes[1]}</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-check form-check-inline">
                                    <input id="To-Watch" className="form-check-input" type="radio" value={0} checked={movieStatus === 0} onChange={e => updateField(e, 'movieStatus')} />
                                    <label htmlFor="To-Watch" className="form-check-label">{movieStatuses[0]}</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input id="Watched" className="form-check-input" type="radio" value={1} checked={movieStatus === 1} onChange={e => updateField(e, 'movieStatus')} />
                                    <label htmlFor="Watched" className="form-check-label">{movieStatuses[1]}</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name" className="col-form-label">Name:</label>
                                <input id="name" type="text" className="form-control" value={name} onChange={e => updateField(e, 'name')} />
                            </div>

                            {watched && <Fragment>
                                <div className="form-group">
                                    <label htmlFor="score" className="col-form-label">Score:</label>
                                    <input id="score" type="number" className="form-control" value={score} onChange={e => updateField(e, 'score')} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="comment" className="col-form-label">Comment:</label>
                                    <textarea id="comment" type="text" className="form-control txtarea-resize" value={comment} onChange={e => updateField(e, 'comment')} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="watchedAt" className="col-form-label">Watched (date):</label>
                                    <input id="watchedAt" type="text" className="form-control" value={watchedAt} onChange={e => updateField(e, 'watchedAt')} />
                                </div>
                            </Fragment>}

                            <div className="form-group">
                                <label htmlFor="notes" className="col-form-label">Notes:</label>
                                <textarea id="notes" type="text" className="form-control txtarea-resize" value={notes} onChange={e => updateField(e, 'notes')} />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-lg btn-secondary" onClick={closeModal}>
                                Close
                            </button>
                            <button disabled={disableButton} className="btn btn-lg btn-primary" onClick={() => saveMovie(movieState)}>
                                Save {showButtonSpinner && <span className="spinner-border spinner-border-sm" aria-hidden="true" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MoviesInputModal;
