import React from 'react';

class MoviesInputModal extends React.Component {

    render() {
        const { movieState, saveMovie, closeModal, updateField, buttonIds } = this.props;
        const { name, score, comment, watchedDate = '/', notes, id } = movieState || {};
        const disabledButton = buttonIds.has(id);

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
                                <label htmlFor="name" className="col-form-label">Name:</label>
                                <input id="name" type="text" className="form-control" value={name} onChange={e => updateField(e, 'name')} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="score" className="col-form-label">Score:</label>
                                <input id="score" type="number" className="form-control" value={score} onChange={e => updateField(e, 'score')} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="comment" className="col-form-label">Comment:</label>
                                <textarea id="comment" type="text" className="form-control txtarea-resize" value={comment} onChange={e => updateField(e, 'comment')} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="watchedDate" className="col-form-label">Watched (date):</label>
                                <input id="watchedDate" type="text" className="form-control" value={watchedDate} onChange={e => updateField(e, 'watchedDate')} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="notes" className="col-form-label">Notes:</label>
                                <textarea id="notes" type="text" className="form-control txtarea-resize" value={notes} onChange={e => updateField(e, 'notes')} />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button disabled={disabledButton} className="btn btn-lg btn-secondary" onClick={closeModal}>
                                Close
                            </button>
                            <button disabled={disabledButton} className="btn btn-lg btn-primary" onClick={() => saveMovie(movieState)}>
                                Save {disabledButton && <span className="spinner-border spinner-border-sm" aria-hidden="true" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MoviesInputModal;
