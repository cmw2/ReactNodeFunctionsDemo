import React from 'react'
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom"
import Menu from './Menu';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import withAITracking from './AppInsights';
import Orders from './Orders';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="app_sidebar">
            <Menu />
          </div>
          <main className="app_content">
            <Routes>
              <Route path="/" element={ <Home/> } />
              <Route path="about" element={ <About/> } />
              <Route path="contact" element={ <Contact/> } />
              <Route path="orders" element={ <Orders/> } />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default withAITracking(App);
