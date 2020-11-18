import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { faLongArrowAltRight, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faLongArrowAltRight, faLongArrowAltLeft, faSearch);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);