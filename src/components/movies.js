import React, { Component } from 'react'
import { getMovies } from './movieService'
import axios from 'axios'

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            currSearchText: "",
            currPage: 1,
            genres: [{ _id: "abcd", name: "All Genres" }],
            currGenr: 'All Genres'
        }
    }
    async componentDidMount() {
        let res = await axios.get('https://backend-react-movie.herokuapp.com/movies');
        let genreRes = await axios.get('https://backend-react-movie.herokuapp.com/genres');
        this.setState({ movies: res.data.movies, genres: [...this.state.genres, ...genreRes.data.genres] });
    }
    handleDelete = (title) => {
        let newAr = this.state.movies.filter(Obj => {
            return Obj.title != title;
        })
        this.setState({
            movies: newAr,
        });
    }
    handleChange = (e) => {
        let val = e.target.value;
        this.setState({
            currSearchText: val
        })
    }
    sortByRatings = (e) => {
        let className = e.target.className;
        let sortedMovies = [];
        if (className === "fas fa-sort-up") {
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return (movieObjA.dailyRentalRate - movieObjB.dailyRentalRate);
            })
        }
        else if (className === "fas fa-sort-down") {
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate;
            })
        }
        this.setState({ movies: sortedMovies });
    }
    sortByStocks = (e) => {
        let className = e.target.className;
        let sortedMovies = [];
        if (className == "fas fa-sort-up") {
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return (movieObjA.numberInStock - movieObjB.numberInStock);
            })
        }
        else if (className == "fas fa-sort-down") {
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return movieObjB.numberInStock - movieObjA.numberInStock;
            })
        }
        this.setState({ movies: sortedMovies });
    }
    handlePageChange = (pageNumber) => {
        this.setState({ currPage: pageNumber });
    }
    handleGenrChange = (genre) =>{
        this.setState({currGenr : genre});
    }
    render() {
        let { movies, currSearchText, currPage, genres, currGenr } = this.state;
        let limit = 4;
        let filteredMovies = [];
        if (currSearchText != "") {
            filteredMovies = movies.filter(movieObj => {
                let title = movieObj.title.trim().toLowerCase();
                return title.includes(currSearchText.toLowerCase());
            })
        }
        else {
            filteredMovies = movies;
        }
        if(currGenr != 'All Genres')
        {
            filteredMovies = filteredMovies.filter(function(movieObj)
            {
                return movieObj.genre.name == currGenr;
            })
        }
        let numberOfPages = Math.ceil(filteredMovies.length / limit);
        let pageNumberArr = [];
        for (let i = 0; i < numberOfPages; i++) {
            pageNumberArr.push(i + 1);
        }
        let startIdx = (currPage - 1) * limit;
        let endIdx = startIdx + limit;
        filteredMovies = filteredMovies.slice(startIdx, endIdx);
        return (
            <>
                {
                    this.state.movies.length == 0 ? <div class="spinner-border text-primary" role="status">
                        <span className ="sr-only">Loading...</span>
                    </div> :
                        <div className="container">
                            <div className="row">
                                <div className="col-3">
                                    <ul className ="list-group">
                                        {
                                            genres.map((genreObj) => (
                                                <li onClick = {()=>this.handleGenrChange(genreObj.name)}key = {genreObj._id} className="list-group-item">{genreObj.name}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className="col-9">
                                    <input type="text" onChange={this.handleChange} val={this.state.currSearchText} ></input>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Genre</th>
                                                <th scope="col">
                                                    <i onClick={this.sortByStocks} className="fas fa-sort-up"></i>
                                                    Stock
                                                    <i onClick={this.sortByStocks} className="fas fa-sort-down"></i>
                                                </th>
                                                <th scope="col">
                                                    <i onClick={this.sortByRatings} className="fas fa-sort-up"></i>
                                                    Rate
                                                    <i onClick={this.sortByRatings} className="fas fa-sort-down"></i>
                                                </th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredMovies.map(movieObj => (
                                                    <tr scope="row" key={movieObj._id}>
                                                        <td>{movieObj.title}</td>
                                                        <td>{movieObj.genre.name}</td>
                                                        <td>{movieObj.numberInStock}</td>
                                                        <td>{movieObj.dailyRentalRate}</td>
                                                        <td><button type="button" className="btn btn-danger" onClick={() => this.handleDelete(movieObj.title)}>Delete</button></td>
                                                    </tr>
                                                )
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    <nav aria-label="...">
                                        <ul className="pagination">
                                            {
                                                pageNumberArr.map((pageNumber) => {
                                                    let className = (pageNumber === currPage) ? 'page-item active' : 'page-item';
                                                    return (
                                                        <li key={pageNumber} onClick={() => this.handlePageChange(pageNumber)} className={className}>
                                                            <span className="page-link">{pageNumber}</span> </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                }
            </>
        )
    }
}