import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import Users from "./components/users"
import { BrowserRouter, Route, Link ,Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>,
  // <Users />,
  document.getElementById('root')
);
