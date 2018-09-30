import React, { Component } from 'react';
import Popup from './popup'
import Input from './input'
import moment from 'moment'

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //values: this.getValues(),
      values: [
        {key: 'Title', value: this.props.movie.Title, error: ''},
        {key: 'Year', value: this.props.movie.Year, error: ''},
        {key: 'Runtime', value: this.props.movie.Runtime, error: ''},
        {key: 'Genre', value: this.props.movie.Genre, error: ''},
        {key: 'Director', value: this.props.movie.Director, error: ''}
      ],
      onConfirmMessage: false,
      isErrors: false
    };
  }

  getValues = () => {
    const values = []
    const attr = {}
    Object.keys(this.props.movie).forEach((key)=>{
      attr.key = key
      attr.value = this.props.movie[key]
      attr.error = ''
      values.push(attr)
    })
    return values
  }

  componentDidUpdate(prevProps) {
    if (this.props.movie.imdbID !== prevProps.movie.imdbID) {
      const temp = [...this.state.values]
      Object.keys(this.props.movie).forEach((key)=>{
        temp.forEach((attr) => {
          if(key === attr.key) {
            attr.value = this.props.movie[key]
          }
        })
      })
      this.setState({values: temp});      
    }
  }

  handleSubmit = () => {
    if(!this.state.isErrors) {
      this.props.onSubmit(this.props.movie.imdbID, this.state.values, this.props.movie.Poster)
    }
  }

  handleChange = (error, key, value) => {
    if (error !== '') {
      this.setState({isErrors: true});
    } else {
      const temp = [...this.state.values]
      temp.map((attr)=>{
        if(attr.key === key)
        attr.value = value
      })
      this.setState({isErrors: false, values: temp});
    }
  }

  closeAll = () => {
    this.setState({onConfirmMessage: false});
    this.props.onClose()
  }
  render() {
    return (
      <div>
          <Popup
            active={this.props.active}
            title={this.props.movie.Title}
            onClose={()=>{this.setState({onConfirmMessage: true})}}
            onSubmit={this.handleSubmit}
            submitButtonText='save changes'>
          {
            this.state.values.map( (attr) => {
              return <Input
                key={attr.key}
                lable={attr.key}
                value={attr.value}
                movieTitles={this.props.movieTitles}
                onChange={this.handleChange}/>
            })
          }
          </Popup>
          <Popup
            active={this.state.onConfirmMessage}
            title='message'
            onClose={()=>{this.setState({onConfirmMessage: false})}}
            onSubmit={this.closeAll}
            submitButtonText='yes'>
          <p>your changes will not be save, are you sure you want to discard?</p>
          </Popup>
          </div>
    );
  }
}

export default EditMovie;