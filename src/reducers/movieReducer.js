import { FETCH_MOVIE, DELETE_MOVIE, EDIT_MOVIE, ERROR } from '../actions/types';

const initialState = {
  error: '',
  movies: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIE:
      return {
        ...state,
        error: '',
        movies: [...state.movies, action.payload]
      }
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie)=>(movie.Title !== action.payload))
      }
    case EDIT_MOVIE:
    const changeOnIndex = state.movies.findIndex((movie)=>(movie.imdbID === action.payload.id))
    state.movies.splice(changeOnIndex, 1, action.payload.newMovie)  
      return {
        ...state,
        movies: state.movies
      }
    case ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}
