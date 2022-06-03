import React from 'react'
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom"
import Menu from './Menu';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
//import reactPlugin from './AppInsights';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import {reactPlugin} from './AppInsights';
import TodoList from './pages/TodoList';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="app_sidebar">
            <Menu />
          </div>
          <main className="app_content">
            <Switch>
              <Route path="/about"><About /></Route>
              <Route path="/contact"><Contact /></Route>
              <Route path="/todo"><TodoList /></Route>
              <Route exact path="/"><Home /></Route>
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default withAITracking(reactPlugin, App);
