//import {API_BASE_URL} from './api'
import moment from 'moment';

export const  getID = function () {
    return  Math.random().toString(36).substr(2, 9);
  };

export const trimString = (str, length) => {
     if(str.length > length){
       return str.substr(0, length) + '...';
     }
    return str
}  


export const getIntial = (name ) => {
    return name.slice(0, 1)
}

export const getImgSrc = () => {
     return `http://localhost:5000/consumerPhotos`
}


export const  timeStamp = (time) => {
  if( (moment().format('dddd')) ===  moment(time).format('dddd')){
       return `Today ${moment(time)?.format('h:mm a')}`
  }
  else if(moment().subtract(1, 'days').format('dddd') ===  moment(time)?.format('dddd')){
      return `Yesterday ${moment(time)?.format('h:mm a')}`
  }
  else{
       return moment(time)?.format('dddd,  h:mm a')
  }

}
