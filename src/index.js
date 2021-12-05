import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import rootReducer from '../src/REDUX/rootReducer/rootReducer';

ReactDOM.render(
  <Provider store={rootReducer}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
