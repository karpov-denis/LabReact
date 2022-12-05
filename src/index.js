import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Book from "./Book";
import Author from "./Author";

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Routes>
              <Route exact path="/book/:id" element={<Book />}></Route>
              <Route exact path="/author/:id" element={<Author />}></Route>
              <Route exact path="/" element={<App />}></Route>
          </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();