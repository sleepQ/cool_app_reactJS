import React, { Component } from 'react';
import Spinner from '../../shared_components/Spinner';
import ErrorMessage from '../../shared_components/ErrorMessage';
import MovieRows from './MovieRows';
import MoviesInputModal from './MoviesInputModal';
import { getMovies, postMovie, updateMovie, deleteMovie } from './movies_endpoints';

const newMovieState = {
    id: 'new',
    name: '',
    score: '',
    comment: '',
    notes: '',
    watchedDate: ''
};

class MoviesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieState: newMovieState,
            moviesList: [],
            isLoading: true,
            showModal: false,
            buttonIds: new Set(),
            error: ''
        };

        this.fetchMovies = this.fetchMovies.bind(this);
        this.openModal = this.openModal.bind(this);
        this.saveMovie = this.saveMovie.bind(this);
        this.removeMovie = this.removeMovie.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateField = this.updateField.bind(this);
        this.isButtonClicked = this.isButtonClicked.bind(this);
    }

    componentDidMount() {
        this.fetchMovies();
    }

    fetchMovies() {
        getMovies().then(res => {
            if (res.ok) {
                this.setState(() => ({ moviesList: res.movies, isLoading: false, error: '' }))
            } else {
                const { message } = res.error || {};
                this.setState(() => ({ error: message, isLoading: false }));
            }
        });
    }

    updateField(e, field) {
        const val = e.target.value;
        this.setState(prevState => ({
            movieState: { ...prevState.movieState, [field]: val }
        }));
    }

    isButtonClicked(buttonId, action = 'delete') {
        if (action === 'add') {
            this.setState(prevState => ({ buttonIds: new Set(prevState.buttonIds).add(buttonId) }));
        } else if (action === 'delete') {
            this.setState(prevState => {
                const newButtonIds = new Set(prevState.buttonIds);
                newButtonIds.delete(buttonId);
                return ({ buttonIds: newButtonIds });
            });
        }
    }

    openModal(data = {}) {
        if (data.id === 'new') {
            this.setState(() => ({ movieState: newMovieState, showModal: true }));
        } else {
            this.setState(() => ({ movieState: data, showModal: true }));
        }
    }

    closeModal() {
        this.setState(() => ({ showModal: false }));
    }

    saveMovie(data = {}) {
        this.isButtonClicked(data.id, 'add');
        if (data.id === 'new') {
            postMovie(data).then(res => {
                this.isButtonClicked(data.id);

                if (res.ok) {
                    this.setState(() => ({ moviesList: res.movies, isLoading: false, error: '' }), this.closeModal)
                } else {
                    const { message } = res.error || {};
                    this.setState(() => ({ error: message, isLoading: false }));
                }
            });
        } else {
            updateMovie(data).then(res => {
                this.isButtonClicked(data.id);

                if (res.ok) {
                    this.setState(() => ({ moviesList: res.movies, isLoading: false, error: '' }), this.closeModal)
                } else {
                    const { message } = res.error || {};
                    this.setState(() => ({ error: message, isLoading: false }));
                }
            });
        }
    }

    removeMovie(movie) {
        if (window.confirm(`Are you sure you want to delete ${movie.name} from the list ?`)) {
            this.isButtonClicked(movie.id, 'add');

            deleteMovie(movie.id).then(res => {
                this.isButtonClicked(movie.id);
                if (res.ok) {
                    this.setState(() => ({ moviesList: res.movies, isLoading: false, error: '' }));
                } else {
                    const { message } = res.error || {};
                    this.setState(() => ({ error: message, isLoading: false }));
                }
            });
        }
    }

    render() {
        const { movieState, moviesList = [], isLoading, showModal, buttonIds, error } = this.state;
        const hasMovies = moviesList.length > 0;

        return (
            <div className="container">
                <div>
                    <h1 className="text-center">Movies / TV-Shows</h1>
                    <br />
                    <ErrorMessage error={error} />

                    {showModal && <MoviesInputModal
                        movieState={movieState}
                        buttonIds={buttonIds}
                        saveMovie={this.saveMovie}
                        closeModal={this.closeModal}
                        updateField={this.updateField}
                    />}

                    {isLoading
                        ? (<div className="text-center"><Spinner /></div>)
                        : (<div>
                            <button className="btn btn-primary mb-2" onClick={() => this.openModal(newMovieState)}>Add Movie</button>
                            <table className="table table-striped table-dark table-bordered table-responsive-sm table-hover">
                                <thead>
                                    <tr className="text-center">
                                        <th scope="col" width="5%">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col" width="5%">Score</th>
                                        <th scope="col">Comment</th>
                                        <th scope="col">Watched (date)</th>
                                        <th scope="col">Notes</th>
                                        <th scope="col" width="15%">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hasMovies && moviesList.map((movie, index) => (
                                        <MovieRows
                                            key={movie.name}
                                            index={index + 1}
                                            movie={movie}
                                            buttonIds={buttonIds}
                                            openModal={this.openModal}
                                            removeMovie={this.removeMovie}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>)
                    }
                </div>
            </div>
        );
    }
}

export default MoviesTable;
