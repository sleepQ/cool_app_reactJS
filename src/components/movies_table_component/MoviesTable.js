import React, { Component } from 'react';
import Spinner from '../../shared_components/Spinner';
import ErrorMessage from '../../shared_components/ErrorMessage';
import MovieRows from './MovieRows';
import { getMovies, postMovies } from './movies_endpoints';

class MoviesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesList: [],
            isLoading: true,
            error: ''
        };
    }

    componentDidMount() {
        getMovies().then(res => {
            if (res.ok) {
                this.setState(() => ({ moviesList: res.movies, isLoading: false }))
            } else {
                const { message } = res.error || {};
                this.setState(() => ({ error: message, isLoading: false }));
            }
        });
    }

    render() {
        const { moviesList = [], isLoading, error } = this.state;

        if (isLoading) {
            return (
                <div className="container">
                    <div className="jumbotron text-center">
                        <Spinner />
                    </div>
                </div>
            );
        }

        return (
            <div className="container">
                <div className="">
                    <h1 className="text-center">Movies</h1>

                    <ErrorMessage error={error} />

                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Score</th>
                                <th scope="col">Comment</th>
                                <th scope="col">Watched (date)</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moviesList.map((movie, idx) => <MovieRows key={movie.name} idx={idx + 1} movie={movie} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default MoviesTable;
