import React, { Component } from 'react';
import Popup from './popup'
class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenTitle: '',
      error: ''
    };
  }

  save = () => {
    if(this.props.movieTitles.find((title)=> title.toLowerCase() === this.state.chosenTitle.toLowerCase())){
      this.setState({error: 'This Title Already Exist'})
    } else {
      this.props.onAddMovie(this.state.chosenTitle)
      this.setState({chosenTitle: ''})
    }
  }

  handleChange = (event) => {
    this.setState({chosenTitle: event.target.value});
  }

  render() {
    return (
      <Popup
        active={this.props.active}
        title='Add Your Movie'
        onClose={this.props.onClose}
        onSubmit={this.save}
        submitButtonText='add'>
          
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Movie Title</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded">
                  <input className="input" type="text" placeholder="inception" 
                    value={this.state.chosenTitle}
                    onChange={this.handleChange} />
                </p>
                <p className="help is-danger">{this.state.error}</p>
              </div>
            </div>
          </div>
         
          </Popup>
    );
  }
}

export default AddMovie;