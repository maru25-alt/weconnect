import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import {LoginString} from './store/LocalStorage';
import { loggin, logout } from './store/slices/userSlice';

if(localStorage.getItem(LoginString.ID)){
  store.dispatch(loggin({
    id: localStorage.getItem(LoginString.ID),
    username: localStorage.getItem(LoginString.USERNAME),
  }))
 }
 else{
  store.dispatch(logout())
 }

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
       </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
