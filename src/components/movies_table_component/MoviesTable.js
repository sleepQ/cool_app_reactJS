import React, { Component } from 'react';
import moment from 'moment';
import ErrorMessage from '../../shared_components/ErrorMessage';
import MovieRows from './MovieRows';
import MoviesInputModal from './MoviesInputModal';
import { movieStatuses } from '../../utils/helper_variables';
import { getMovies, postMovie, updateMovie, deleteMovie } from './movies_endpoints';

const newMovieState = {
    id: 'new',
    name: '',
    score: '5',
    comment: '',
    notes: '',
    movieType: 0,
    movieStatus: 0,
    watchedAt: ''
};

class MoviesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieState: newMovieState,
            moviesList: [],
            isLoading: true,
            showModal: false,
            buttonIds: new Map(),
            sortBy: "",
            error: ''
        };
        this.controller = new AbortController();

        this.fetchMovies = this.fetchMovies.bind(this);
        this.openModal = this.openModal.bind(this);
        this.saveMovie = this.saveMovie.bind(this);
        this.removeMovie = this.removeMovie.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateField = this.updateField.bind(this);
        this.isButtonClicked = this.isButtonClicked.bind(this);
        this.sortMovies = this.sortMovies.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.fetchMovies();
    }

    componentWillUnmount() {
        this.mounted = false;
        this.controller.abort();
    }

    fetchMovies() {
        getMovies(this.controller.signal).then(res => {
            if (res.ok) {
                this.setState(() => ({ moviesList: res.movies, isLoading: false, error: '' }))
            } else {
                const { message, name } = res.error || {};

                if (name === 'AbortError')
                    return;

                this.setState(() => ({ error: message, isLoading: false }));
            }
        });
    }

    updateField(e, field) {
        let value;

        if (field === 'score') {
            value = e;
        } else if (field === 'watchedAt') {
            value = moment(e).format('YYYY-MM-DD');
        } else {
            value = e.target.value;
        }

        if (field === 'movieType' || field === 'movieStatus') {
            value = Number(value);
        }

        this.setState(prevState => ({
            movieState: { ...prevState.movieState, [field]: value }
        }));
    }

    isButtonClicked(buttonId, button) {
        this.setState(prevState => {
            const newButtonIds = new Map(prevState.buttonIds);

            if (newButtonIds.has(buttonId)) {
                newButtonIds.delete(buttonId);
            } else {
                newButtonIds.set(buttonId, button);
            }
            return ({ buttonIds: newButtonIds });
        });

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
        this.isButtonClicked(data.id, 'save');

        if (movieStatuses[data.movieStatus] === 'To-Watch') {
            data.score = null;
            data.comment = null;
            data.watchedAt = null;
        }

        if (data.id === 'new') {
            postMovie(data).then(res => {
                if (this.mounted) {
                    this.isButtonClicked(data.id, 'save');

                    if (res.ok) {
                        this.setState(() => ({ moviesList: res.movies, isLoading: false, error: '' }));
                        this.closeModal();
                    } else {
                        const { message } = res.error || {};
                        this.setState(() => ({ error: message, isLoading: false }));
                    }
                }
            });
        } else {
            updateMovie(data).then(res => {
                if (this.mounted) {
                    this.isButtonClicked(data.id, 'save');

                    if (res.ok) {
                        this.setState(() => ({ moviesList: res.movies, isLoading: false, error: '' }));
                        this.closeModal();
                    } else {
                        const { message } = res.error || {};
                        this.setState(() => ({ error: message, isLoading: false }));
                    }
                }
            });
        }
    }

    removeMovie(movie) {
        if (window.confirm(`Are you sure you want to delete ${movie.name} from the list ?`)) {
            this.isButtonClicked(movie.id, 'delete');

            deleteMovie(movie.id).then(res => {
                if (this.mounted) {
                    this.isButtonClicked(movie.id, 'delete');

                    if (res.ok) {
                        this.setState(() => ({ moviesList: res.movies, isLoading: false, error: '' }));
                    } else {
                        const { message } = res.error || {};
                        this.setState(() => ({ error: message, isLoading: false }));
                    }
                }
            });
        }
    }

    sortMovies(colName) {
        if (this.state.sortBy === colName) {
            this.setState((prevState) => ({ moviesList: [...prevState.moviesList].reverse() }));
        } else {
            this.setState((prevState) => ({ sortBy: colName, moviesList: [...prevState.moviesList].sort((a, b) => a[colName] > b[colName] ? -1 : 1) }));
        }
    }

    render() {
        const { movieState, moviesList = [], isLoading, showModal, buttonIds, error } = this.state;
        const hasMovies = moviesList.length > 0;

        return (
            <div className="container">
                <div className="jumbotron">
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
                        ? (<div className="text-center"><div className="spinner-border" /></div>)
                        : (<div>
                            <button type="button" className="btn btn-primary mb-2" onClick={() => this.openModal(newMovieState)}>Add Movie</button>
                            <table className="table table-striped table-dark table-bordered table-responsive-sm movieTable">
                                <thead>
                                    <tr className="text-center">
                                        <th className="px-1 overflow-auto" width="5%">#</th>
                                        <th className="px-1 overflow-auto cursor-pointer" width="14%" onClick={() => this.sortMovies("name")}>Name</th>
                                        <th className="px-1 overflow-auto cursor-pointer" width="7%" onClick={() => this.sortMovies("score")}>Score</th>
                                        <th className="px-1 overflow-auto cursor-pointer" width="11%" onClick={() => this.sortMovies("watchedAt")}>Date watched</th>
                                        <th className="px-1 overflow-auto" width="25%">Comment</th>
                                        <th className="px-1 overflow-auto" width="25%">Watch notes</th>
                                        <th className="px-1 overflow-auto" width="13%">Actions</th>
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
