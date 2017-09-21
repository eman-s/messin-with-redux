import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import APPLICATION_ID from './token.js'
import {connect} from 'react-redux'
import {getPhotos, loadingFinished, searchPhotos} from './actions'


class App extends Component {

  componentDidMount() {
    fetch(`https://api.unsplash.com/photos/?client_id=${APPLICATION_ID}`)
    .then(res => res.json(0))
    .then(json => {
      console.log(json)
      this.props.getPhotosAsProp(json)
      this.props.loadingFinishedAsProp()
     })
  }

  handleSubmit (e){
    e.preventDefault()
    const whatWasTyped = this.text.value
    this.props.searchPhotosAsProp(whatWasTyped)
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          There are {this.props.photos.length} photos
        </p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type='text' placeholder='search for images' ref={element => this.text = element} />
        </form>
        {this.props.isLoading && <p>Loading...</p>}
        {this.props.photos.map(photo => <div><img src={photo.urls.small}/></div>)}
      </div>
    );
  }
}

//export default App;

const mapStateToProps = (state) => {
  return {
    photos: state.photos,
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPhotosAsProp: (photosTheParameter) => dispatch(getPhotos(photosTheParameter)),
    loadingFinishedAsProp: () => dispatch(loadingFinished()),
    searchPhotosAsProp: (searchTerm) => dispatch(searchPhotos(searchTerm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
