// import ListGroup from '@bit/react-bootstrap.react-bootstrap.list-group'
import React, { Component } from 'react'
// import ListGroup from '@bit/react-bootstrap.react-bootstrap.list-group'
import ListGroup from "react-bootstrap/ListGroup";

// import ReactBootstrapStyle from '@bit/react-bootstrap.react-bootstrap.internal.style-links';
import Pagination from './components/pagination'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
       <Pagination/>
    </div>
  );
}

export default App;
