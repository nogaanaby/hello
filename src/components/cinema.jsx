import React, { Component } from 'react';
import Movie from './movie';
import AddMovie from './addMovie';
import addMovieIcon from '../addMovieIcon.png';
import EditMovie from './editMovie';
import Expand from './expandMovie';
import Popup from './popup';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchMovie, deleteMovie, editMovie, fetchError } from '../actions/movieActions.js'
import '../App.css';

class Cinema extends Component {
  constructor() {
    super();
    this.state = {
      movieTitles: [ 'inception', 'lala', 'v for vendetta', 'sisters', 'The Great Gatsby', 'The Visit'],
      CinemaWidth: this.getCinemaWidth(),
      movieBoxWidth: this.getCinemaWidth()/ (Math.ceil(this.getCinemaWidth() / 400)),
      popup: 'non',
      deleteMovieByTitle: ''
    };
  }

  /****************   GENERAL   *************/

  calcMovieBoxWidth = () => {
    this.setState({CinemaWidth: this.getCinemaWidth()});
    const {CinemaWidth} = this.state
    const maxSize = 400;
    const imagesPerRow = Math.ceil(CinemaWidth / maxSize);
    const margin = 10
    const margins = margin * 2 * imagesPerRow
    const remainSpace = CinemaWidth - margins
    const size = (remainSpace / imagesPerRow);
    this.setState({
      movieBoxWidth: size
    });
  }

  getCinemaWidth(){
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }

  componentDidMount() {
    this.calcMovieBoxWidth()
    window.addEventListener('resize', this.calcMovieBoxWidth)
    this.state.movieTitles.forEach((title)=>{
      this.props.fetchMovie(title)
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calcMovieBoxWidth)
  }

  closePopup = () => {
    this.setState({popup: 'non'})
  }

  closeError = () => {
    this.props.fetchError('')
  }

  /****************   DELETE   *************/

  confirmDelete = (title) => {
    this.props.fetchError(`Are you sure you want to delete ${title}?`)
    this.setState({deleteMovieByTitle: title})
  }

  submitErrorOrDelete = () => {
    this.props.fetchError('')
    if(this.state.deleteMovieByTitle !== '') {
      this.props.deleteMovie(this.state.deleteMovieByTitle)
      this.setState({deleteMovieByTitle: ''})
    }
  }

  /****************   EDIT   *************/

  handleEdit = (title) => {
    this.setState({popup: title + '_edit'})
  }

  handleEditSubmit = (movieID, valuesArray, moviePoster) => {
    let newMovie = {
      imdbID: movieID,
      Title: '',
      Year: '',
      Runtime: '',
      Genre: '',
      Director: '',
      Poster: moviePoster
    }
    valuesArray.forEach(elem => {
      newMovie[elem.key] = elem.value
    })
    this.props.editMovie(movieID, newMovie)
    this.closePopup()
  }

  /****************   ADD MOVIE   *************/

  openAdding = () => {
    this.setState({popup: 'addMovie'})
  }

  addMovie = (title) => {
    this.props.fetchMovie(title)
    if(this.props.error === '') {
      this.closePopup()
    }
  }

/****************   EXPAND MOVIE   *************/


  handleExpand = (title) => {
    this.setState({popup: title + '_expand'})
  }

  flipMovie = (id, direction) => {
    const currentExpandedIndex = this.props.movies.findIndex((movie)=>movie.imdbID === id)
    const nextMovie = this.props.movies[currentExpandedIndex+1]
    const prevMovie = this.props.movies[currentExpandedIndex-1]
    if (direction === 'next' && currentExpandedIndex !== this.props.movies.length-1) {
      this.setState({popup: nextMovie.Title + '_expand'})
    } else if(direction === 'prev' && currentExpandedIndex !== 0) {
      this.setState({popup: prevMovie.Title + '_expand'})
    }
  }

  render() {
    return (
      <div className="cinema">
        <div className="movies">
          {
            this.props.movies.map((movie, index)=>{
              return <div key={index}>
                <Movie
                movieBoxWidth={this.state.movieBoxWidth}
                movie={movie}
                onDelete={this.confirmDelete}
                onEdit={this.handleEdit}
                onExpand={this.handleExpand}
                presentType="mini"
                editBText={<i className="far fa-edit iconTurkiz"></i>}
                expandBText={<i className="fas fa-expand iconTurkiz"></i>}
                deleteBText={<i className="fas fa-trash-alt iconTurkiz"></i>}/>
                <EditMovie
                movie={movie}
                active={this.state.popup === movie.Title + '_edit'}
                onClose={this.closePopup}
                onSubmit={this.handleEditSubmit}
                movieTitles={this.state.movieTitles}/>
                <Expand
                movie={movie}
                active={this.state.popup === movie.Title + '_expand'}
                onClose={this.closePopup}
                onFlipMovie={this.flipMovie}
                />
              </div>
            })
          }
        </div>
        <Popup
          active={this.props.error}
          title='massage'
          onClose={this.closeError}
          onSubmit={this.submitErrorOrDelete}
          submitButtonText='OK'>
          <p>{this.props.error}</p>
        </Popup>
        <a className="addMovieIcon">
          <img className="addMovieIcon" alt="add movie"
          src={addMovieIcon}
          onClick={this.openAdding}/>
        </a>
        <AddMovie
          active={this.state.popup === 'addMovie'}
          movieTitles={this.state.movieTitles}
          onAddMovie={this.addMovie}
          onClose={this.closePopup}
        />
      </div>
    );
  }
}

Cinema.propTypes = {
  fetchMovie: PropTypes.func,
  deleteMovie: PropTypes.func,
  editMovie: PropTypes.func,
  fetchError: PropTypes.func
}

const mapStateToProps = state => ({
  movies: state.elements.movies,
  error: state.elements.error
})

export default connect(mapStateToProps, {fetchMovie, deleteMovie, editMovie, fetchError})(Cinema);
