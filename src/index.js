import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import rootReducer from '../src/REDUX/rootReducer/rootReducer';
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import Themes from "./themes";
import './index.css';

const Main = () => {
  const { theme } = useSelector(s => s.mainRememberReducer)
  let type = (t) => theme == false ? Themes.default : Themes.dark
  return (
    <ThemeProvider theme={type(theme)}>
      <CssBaseline />
      <Root />
    </ThemeProvider>
  )
}

ReactDOM.render(
  <Provider store={rootReducer}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
