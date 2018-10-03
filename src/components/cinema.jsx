import React, { Component } from 'react';
import Movie from './movie';
import AddMovie from './addMovie';
import addMovieIcon from '../addMovieIcon.png';
import EditMovie from './editMovie';
import LoadSpinner from './loadSpinner';
import Popup from './popup';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchMovie, deleteMovie, editMovie, fetchError } from '../actions/movieActions.js'

class Cinema extends Component {
  constructor() {
    super();
    this.state = {
      movieTitles: [ 'inception', 'dog day afternoon', 'v for vendetta', 'sisters', 'The Great Gatsby', 'The Visit'],
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

  componentDidUpdate (prevProps) {
    if(this.props.error !== prevProps.error || this.props.movies !== prevProps.movies) {
      this.closePopup()
    }
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
    this.setState({popup: 'spinner'})
  }

    /****************   spinner   *************/

    activateSpinner = () => {
      this.setState({popup: 'spinner'})
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
                onEdit={this.handleEdit}/>
                <EditMovie
                movie={movie}
                active={this.state.popup === movie.Title + '_edit'}
                onClose={this.closePopup}
                onSubmit={this.handleEditSubmit}
                movieTitles={this.state.movieTitles}/>
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
        <LoadSpinner
          active={this.state.popup === 'spinner'}/>
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

