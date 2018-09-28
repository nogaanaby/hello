import React, { Component } from 'react';
import Popup from './popup'
class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [
        {key: 'Title', value: this.props.movie.Title, error: ''},
        {key: 'Year', value: this.props.movie.Year, error: ''},
        {key: 'Runtime', value: this.props.movie.Runtime, error: ''},
        {key: 'Genre', value: this.props.movie.Genre, error: ''},
        {key: 'Director', value: this.props.movie.Director, error: ''}
      ],
      onAreYouSureMessage: false
    };
  }

  valid = () => {
    let noErrors = true
    const temp = [...this.state.values]
    temp.forEach((attr)=>{
      if(attr.value.length === 0) {
        attr.error = 'this field must be fild with value'
        noErrors = false
      } else {
        attr.error = ''
      }
    })
    this.setState({values: temp});
    return noErrors
  }

  titleExist = () => {
    const originTitle = this.props.movie.Title
    const chosenTitle = this.state.values[0].value
    if(originTitle !== chosenTitle && this.props.movieTitles.find((movieTitle)=> movieTitle.toLowerCase() === chosenTitle.toLowerCase())){
      this.state.values[0].error = 'This Title Already Exist'
      return true
    }
    return false
  }

  handleSubmit = () => {
    if(this.valid() && !this.titleExist()) {
      this.props.onSubmit(this.props.movie.imdbID, this.state.values, this.props.movie.Poster)
    }
  }

  handleChange = (event, key) => {
    const temp = [...this.state.values]
    temp.forEach((attr)=>{
      if(attr.key === key) {
        attr.value = event.target.value
      }
    })
    this.setState({values: temp});
  }

  closeEdit = () => {
    this.setState({onAreYouSureMessage: true});
  }

  closeAreYouSure = () => {
    this.setState({onAreYouSureMessage: false});
  }

  closeAll = () => {
    this.closeAreYouSure()
    this.props.onClose()
  }
  render() {
    return (
      <div>
          <Popup
            active={this.props.active}
            title={this.props.movie.Title}
            onClose={this.closeEdit}
            onSubmit={this.handleSubmit}
            submitButtonText='save changes'>
          {
          this.state.values.map( (attr, index) => {
            return <div className="field is-horizontal" key={attr.key}>
              <div className="field-label is-normal">
                <label className="label">{attr.key}</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded">
                    <input className="input" type="text" value={attr.value}
                      onChange={(e) => this.handleChange(e, attr.key)}/>
                  </p>
                  <p className="help is-danger">{attr.error}</p>
                </div>
              </div>
            </div>
          })
          }
          </Popup>
          <Popup
            active={this.state.onAreYouSureMessage}
            title='message'
            onClose={this.closeAreYouSure}
            onSubmit={this.closeAll}
            submitButtonText='yes'>
          <p>your changes will not be save, are you sure you want to discard?</p>
          </Popup>
          </div>
    );
  }
}

export default EditMovie;