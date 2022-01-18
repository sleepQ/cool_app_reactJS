import React from 'react';
import NumericInput from 'react-numeric-input';
import DatePicker from '../../shared_components/date_picker_component/DatePicker';
import { movieTypes, movieStatuses } from '../../utils/helper_variables';
import { validBeforeToday } from '../../utils/helper_functions';

class MoviesInputModal extends React.Component {
    constructor(props) {
        super(props);

        this.escFunction = this.escFunction.bind(this);
    }

    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.closeModal();
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

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
            <div className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Movie / TV-show</h5>
                            <button type="button" className="close" onClick={closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group d-flex justify-content-between">
                                <label className="col-form-label">TV type:</label>
                                <div className="form-check form-check-inline">
                                    <input disabled={disableButton} id="Movie" className="form-check-input" type="radio" value={0} checked={movieType === 0} onChange={e => updateField(e, 'movieType')} />
                                    <label htmlFor="Movie" className="form-check-label">{movieTypes[0]}</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input disabled={disableButton} id="TV-show" className="form-check-input" type="radio" value={1} checked={movieType === 1} onChange={e => updateField(e, 'movieType')} />
                                    <label htmlFor="TV-show" className="form-check-label">{movieTypes[1]}</label>
                                </div>
                            </div>

                            <div className="form-group d-flex justify-content-between">
                                <label className="col-form-label">TV status:</label>
                                <div className="form-check form-check-inline">
                                    <input disabled={disableButton} id="To-Watch" className="form-check-input" type="radio" value={0} checked={movieStatus === 0} onChange={e => updateField(e, 'movieStatus')} />
                                    <label htmlFor="To-Watch" className="form-check-label">{movieStatuses[0]}</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input disabled={disableButton} id="Watched" className="form-check-input" type="radio" value={1} checked={movieStatus === 1} onChange={e => updateField(e, 'movieStatus')} />
                                    <label htmlFor="Watched" className="form-check-label">{movieStatuses[1]}</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name" className="col-form-label">Name:</label>
                                <input disabled={disableButton} id="name" type="text" className="form-control" value={name} onChange={e => updateField(e, 'name')} />
                            </div>

                            <div className={`${watched ? 'visible' : 'hidden'}`}>
                                <div className="form-group row">
                                    <div className="col-4">
                                        <label htmlFor="score" className="col-form-label">Score:</label>
                                        <NumericInput
                                            id="score"
                                            className="form-control"
                                            strict
                                            disabled={disableButton}
                                            min={1}
                                            max={10}
                                            step={0.5}
                                            precision={1}
                                            value={score}
                                            onChange={e => updateField(e, 'score')}
                                        />
                                    </div>

                                    <div className="col-6">
                                        <DatePicker
                                            inputProps={{ placeholder: 'YYYY-MM-DD' }}
                                            labelClassName="col-form-label"
                                            label="Watched:"
                                            value={watchedAt}
                                            viewMode="years"
                                            dateFormat="YYYY-MM-DD"
                                            onChange={e => updateField(e, 'watchedAt')}
                                            isValidDate={validBeforeToday}
                                        />
                                    </div>

                                </div>

                                <div className="form-group">
                                    <label htmlFor="comment" className="col-form-label">Comment:</label>
                                    <textarea disabled={disableButton} id="comment" type="text" className="form-control txtarea-resize" value={comment} onChange={e => updateField(e, 'comment')} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="notes" className="col-form-label">Notes:</label>
                                <textarea disabled={disableButton} id="notes" type="text" className="form-control txtarea-resize" value={notes} onChange={e => updateField(e, 'notes')} />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-lg btn-secondary" onClick={closeModal}>
                                Close
                            </button>
                            <button type="button" disabled={disableButton} className="btn btn-lg btn-primary" onClick={() => saveMovie(movieState)}>
                                Save {showButtonSpinner && <span className="spinner-border spinner-border-sm" aria-hidden="true" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default MoviesInputModal;
