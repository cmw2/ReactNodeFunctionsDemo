import React from 'react'
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom"
import Menu from './Menu';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import withAITracking from './AppInsights';
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
            <Routes>
              <Route path="/" element={ <Home/> } />
              <Route path="about" element={ <About/> } />
              <Route path="contact" element={ <Contact/> } />
              <Route path="todo" element={ <TodoList/> } />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default withAITracking(App);
