import React, { Component } from 'react';
import noimage from '../noimage.jpg';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getPoster = () => {
      if(this.props.movie.Poster !== "N/A"){
        return this.props.movie.Poster
      } else {
        return noimage
      }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="movieCard" style={{
        width: this.props.movieBoxWidth + 'px'
      }}>
        <div className="card">
          <div className="card-image" style={{backgroundColor: 'lightGrey'}}>
            <figure className="image is-4by3" style={{
              width: '60%',
              margin: 'auto'
            }}>
              <a href={this.props.movie.Website} onClick={this.addMovie}><img src={this.getPoster()} alt="movie poster"></img></a>
            </figure>
          </div>
          <div className="card-content">
              <div className="media-content">
                <p className="title is-5">{this.props.movie.Title}</p>
                <p className="subtitle is-6"><b>Year: </b>{this.props.movie.Year}</p>
              </div>
            <div className="movie-content">
              <ul className="movie-details">
                <li className="is-small"><b>Director: </b>{this.props.movie.Director}</li>
                <li className="is-small"><b>Runtime: </b>{this.props.movie.Runtime}</li>
                <li className="is-small"><b>Genre: </b>{this.props.movie.Genre}</li>
              </ul>
            </div>
          </div>
          <footer className="card-footer">
            <a onClick={()=>this.props.onEdit(this.props.movie.Title)} className="card-footer-item"><i className="far fa-edit iconTurkiz"></i></a>
            <a onClick={()=>this.props.onDelete(this.props.movie.Title)} className="card-footer-item"><i className="fas fa-trash-alt iconTurkiz"></i></a>
          </footer>
        </div>
      </div>
    );
  }
}

export default Movie;