import React, { Component } from 'react'
import {getMovies} from './movieService'

export default class Movies extends Component {
    constructor(props)
        {
            super(props);
            this.state = {
                movies:getMovies(),
                currSearchText : ""
            } 
        }
        handleDelete = (title) =>{
         let newAr = this.state.movies.filter(Obj =>
            {
              return Obj.title != title;
            })
            this.setState({
                movies : newAr,
                });
        }
        handleChange = (e) =>{
            let val = e.target.value;
            this.setState({
                currSearchText : val
            })
           }
           sortByRatings = (e) =>{
             let className = e.target.className;
             let sortedMovies = [];
             if(className == "fas fa-sort-up")
             {
                 sortedMovies = this.state.movies.sort(function(movieObjA,movieObjB)
                 {
                     return (movieObjA.dailyRentalRate - movieObjB.dailyRentalRate);
                 }) 
             }
             else if(className == "fas fa-sort-down"){
                sortedMovies = this.state.movies.sort(function(movieObjA,movieObjB)
                {
                    return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate;
                })
             }
              this.setState({movies:sortedMovies});
           }
           sortByStocks = (e) =>{
            let className = e.target.className;
            let sortedMovies = [];
            if(className == "fas fa-sort-up")
            {
                sortedMovies = this.state.movies.sort(function(movieObjA,movieObjB)
                {
                    return (movieObjA.numberInStock - movieObjB.numberInStock);
                }) 
            }
            else if(className == "fas fa-sort-down"){
               sortedMovies = this.state.movies.sort(function(movieObjA,movieObjB)
               {
                   return movieObjB.numberInStock - movieObjA.numberInStock;
               })
            }
             this.setState({movies:sortedMovies});
          }
    render() {
        let {movies,currSearchText} = this.state;
        let filteredMovies = [];
        if(currSearchText != "")
        {
           filteredMovies = movies.filter(movieObj => 
            {
               let title = movieObj.title.trim().toLowerCase();
               return title.includes(currSearchText.toLowerCase()) ;
            })
        }
        else{
            filteredMovies  = movies;
        }
        return (
            <div className = "container">
            <div className = "row">
                <div className = "col-3">
                    <h1>Hello</h1>
                </div>
                <div className = "col-9">
                    <input type = "text" onChange = {this.handleChange} val = {this.state.currSearchText} ></input>
                <table className ="table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
      <th scope="col">
      <i onClick = {this.sortByStocks} className ="fas fa-sort-up"></i>
          Stock
          <i  onClick = {this.sortByStocks} className ="fas fa-sort-down"></i>
          </th>
      <th scope="col">
      <i  onClick = {this.sortByRatings} className ="fas fa-sort-up"></i>
          Rate
          <i onClick = {this.sortByRatings} className ="fas fa-sort-down"></i>
          </th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {
       filteredMovies.map(movieObj =>(
            <tr scope = "row" key = {movieObj._id}>
                <td>{movieObj.title}</td>
                <td>{movieObj.genre.name}</td>
                <td>{movieObj.numberInStock}</td>
                <td>{movieObj.dailyRentalRate}</td>
                <td><button type="button" className ="btn btn-danger" onClick = {() => this.handleDelete(movieObj.title)}>Delete</button></td>                
                </tr>
        )
        )
    }
  </tbody>
</table>
                </div>
            </div>
            </div>
        )
    }
}