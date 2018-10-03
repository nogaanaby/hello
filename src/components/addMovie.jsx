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
    if(this.state.chosenTitle === ''){
      this.setState({error: `This field can't stey empty`})
    } else if(this.state.error === ''){
      this.props.onAddMovie(this.state.chosenTitle)
      this.setState({chosenTitle: ''})
    }
  }

  handleChange = (event) => {
    this.setState({error: ''});
    this.setState({chosenTitle: event.target.value});
    if(this.props.checkTitle(event.target.value) === 'This Title Already Exist'){
      this.setState({error: 'This Title Already Exist'})
    }
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