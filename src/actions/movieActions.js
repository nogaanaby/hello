import { FETCH_MOVIE, DELETE_MOVIE, EDIT_MOVIE, ERROR } from './types';

export const removeNonStrings = (word) => {
  return JSON.stringify(word).replace( /[^a-zA-Z]/g , '');
}

export const titlePresentFormat = (title) => {
  let arrangedTitle = ''
  const titleWordsArray = title.toLowerCase().split(" ")

  titleWordsArray.forEach((word) => {
    arrangedTitle = arrangedTitle + ' ' + removeNonStrings(word).charAt(0).toUpperCase() + removeNonStrings(word).slice(1)
  })
  return arrangedTitle
}

export const fetchMovie = (title) => dispatch => {
    fetch(`https://www.omdbapi.com/?t=${title}&apikey=1eedd151`)
    .then(res => res.json())
    .then(movie => {
      if(movie.Response === 'True') {
        movie.Title = titlePresentFormat(movie.Title)
        dispatch({ type: FETCH_MOVIE, payload: movie})
      } else {
        dispatch({ type: ERROR, payload: movie.Error})
      }
    })
}

export const deleteMovie = (title) => dispatch => {
  dispatch({
    type: DELETE_MOVIE,
    payload: title
  })
}

export const editMovie = (id ,newMovie) => dispatch => {
  newMovie.Title = titlePresentFormat(newMovie.Title)
  dispatch({
    type: EDIT_MOVIE,
    payload: {id, newMovie}
  })
}

export const fetchError = (error) => dispatch => {
  dispatch({
    type: ERROR,
    payload: error
  })
}