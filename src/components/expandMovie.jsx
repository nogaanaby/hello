import React, { Component } from 'react';
import Popup from './popup'
import Movie from './movie'
class Expand extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Popup
        active={this.props.active}
        title={this.props.movie.Title}
        onClose={this.props.onClose}
        onSubmit={this.props.onClose}
        submitButtonText='close'>
        <div style={{margin: 'auto', width: '100%'}}>
            <Movie
            movie={this.props.movie}
            onDelete={() => {}}
            onEdit={() => this.props.onFlipMovie(this.props.movie.imdbID, 'prev')}
            onExpand={() => this.props.onFlipMovie(this.props.movie.imdbID, 'next')}
            editBText={<i className="fas fa-angle-left fa-3x"></i>}
            expandBText={<i className="fas fa-angle-right fa-3x"></i>}
            deleteBText=''
            presentType="expanded"
            />
        </div>
      </Popup>
    );
  }
}

export default Expand;