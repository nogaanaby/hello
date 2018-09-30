import React, { Component } from 'react';
import moment from 'moment'
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      error: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({value: this.props.value});      
    }
  }

  checkDateValidation = (value) => {
    if(this.props.lable === 'Year') {
      const chosenYear = value
      const date = moment(chosenYear)
      if(!date.isValid()) {
        return 'Please Type Valid Date'
      }
    }
    return ''
  }

  checkTextValidation = (value) => {
    if(value.length === 0) {
      return 'this field can not be empty'
    }
    return ''
  }

  checkTitleValidation = (value) => {
    if(this.props.lable === 'Title') {
      const originTitle = this.props.value
      const chosenTitle = value
      if(originTitle !== chosenTitle && this.props.movieTitles.find((movieTitle)=> movieTitle.toLowerCase() === chosenTitle.toLowerCase())){
        return 'This Title Already Exist'
      }
    }
    return ''
  }

  checkForErrors = (value) => {
    if(this.checkTextValidation(value) !== '') {
      return this.checkTextValidation(value)
    } else if (this.checkDateValidation(value) !== '')  {
      return this.checkDateValidation(value)
    } else if (this.checkTitleValidation(value) !== '') {
      return this.checkTitleValidation(value)
    }
    return ''
  }


  handleChange = (event) => {
    const inputVal = event.target.value
    this.setState({value: inputVal});
    this.props.onChange(this.checkForErrors(inputVal), this.props.lable, inputVal)
    this.setState({error: this.checkForErrors(inputVal)})
  }

  render() {
    return (
      <div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">{this.props.lable}</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="text" value={this.state.value}
                  onChange={(e) => this.handleChange(e)}/>
              </p>
              <p className="help is-danger">{this.state.error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Input;