import React, { Component } from 'react';
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

  checkRuntimeValidation = (value) => {
    if(this.props.label === 'Runtime') {
      if(value.match(/[^0-9]/g)) {
        return 'Please Type Valid Runtime, integers only'
      } else if(value.length > 4){
        return `Movie's runtime can't be that long`
      }
    }
    return false
  }

  checkDateValidation = (value) => {
    if(this.props.label === 'Year') {
      const year = value
      if(year.match(/[^0-9]/g) || 
          parseInt(year) < 1900 || 
          parseInt(year) > 2018 || 
          year.length > 4) {
        return 'Please Type Valid Year between 1900-2018'
      }
    }
    return false
  }

  checkTextValidation = (value) => {
    if(value.length === 0) {
      return `this field can't be empty`
    }
    return false
  }

  checkTitleValidation = (value) => {
    if(this.props.label === 'Title') {
      const originTitle = this.props.value
      const chosenTitle = value
      if(originTitle !== chosenTitle){
        return this.props.checkTitle(value)
      }
    }
    return false
  }

  checkForErrors = (value) => {
    const textError = this.checkTextValidation(value)
    const yearError = this.checkDateValidation(value)
    const titleError = this.checkTitleValidation(value)
    const runtimeError = this.checkRuntimeValidation(value)

    return (textError || yearError || titleError || runtimeError)
  }


  handleChange = (event) => {
    const inputVal = event.target.value
    this.setState({value: inputVal});
    this.setState({error: this.checkForErrors(inputVal)})
    this.props.onChange(this.checkForErrors(inputVal), this.props.label, inputVal)
  }

  render() {
    return (
      <div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">{this.props.label}</label>
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