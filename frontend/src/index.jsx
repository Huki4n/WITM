import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import {configureStore} from "@reduxjs/toolkit";
import {useDispatch,useSelector} from 'react-redux'



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
);


