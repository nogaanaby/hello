import React, { Component } from 'react';
import noimage from '../noimage.jpg';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleShortcut: this.maxCharPerLine(this.props.movie.Title)
    };
  }

  getPoster = () => {
      if(this.props.movie.Poster !== "N/A"){
        return this.props.movie.Poster
      } else {
        return noimage
      }
  }

  addMovieExample = () => {
    const example = {
      Title: 'Title',
      Year: 'Title',
      Director:'Title',
      Runtime:'Title',
      Genre:'Title'
    }
    this.setState({movie: example})
  }

  componentDidMount() {

  }

  maxCharPerLine = (text) => {
    if(text.length > 12 && this.props.presentType === 'mini'){
      return text.slice(0, 12) + '...'
    } else {
      return text
    }
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
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src={noimage} alt="Placeholder image"></img>
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{this.state.titleShortcut}</p>
                <p className="subtitle is-6">@{this.props.movie.Year}</p>
              </div>
            </div>

            <div className="movie-content">
              <ul className="movie-details">
                <li><b>Director: </b>{this.props.movie.Director}</li>
                <li><b>Runtime: </b>{this.props.movie.Runtime}</li>
                <li><b>Genre: </b>{this.props.movie.Genre}</li>
              </ul>
            </div>
          </div>
          <footer className="card-footer">
            <a onClick={()=>this.props.onEdit(this.props.movie.Title)} className="card-footer-item">{this.props.editBText}</a>
            <a onClick={()=>this.props.onDelete(this.props.movie.Title)} className="card-footer-item">{this.props.deleteBText}</a>
            <a onClick={()=>this.props.onExpand(this.props.movie.Title)} className="card-footer-item">{this.props.expandBText}</a>
          </footer>
        </div>
      </div>
    );
  }
}

export default Movie;