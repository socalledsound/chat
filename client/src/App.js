import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Join from './features/Join/Join'
import Chat from './features/Chat/Chat'
import './App.css';

const App = () => (
  <Router>
    <Route path="/" exact component={Join} />
    <Route path="/chat" component={Chat} />
  </Router>
)

export default App;
