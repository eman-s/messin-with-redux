import APPLICATION_ID from './token.js'
export const GET_PHOTOS = 'GET_PHOTOS';
export const LOADING_FINISHED = 'LOADING_FINISHED'
export const SEARCH_PHOTOS = 'SEARCH_PHOTOS'

const makeActionCreator = (type) =>{
  return function(payload){
    return{
      type,
      payload
    }
  }
}

export const getPhotos = makeActionCreator(GET_PHOTOS)
export const loadingFinished = makeActionCreator(LOADING_FINISHED)

export const searchPhotos = (query) =>{
  return (dispatch, getState) => {
    fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${APPLICATION_ID}`)
    .then(res => res.json(0))
    .then(json => {
      console.log(json)
      dispatch(getPhotos(json.results))
      dispatch(loadingFinished())
     })
  }
}
