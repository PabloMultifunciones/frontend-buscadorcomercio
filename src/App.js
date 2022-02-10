import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
//Vistas
import Search from './views/search.js';
import Register from './views/register.js';
import Login from './views/login.js';
//Estilos
import './css/bootstrap.min.css';

const cookie = new Cookies();

class App extends Component{
  
  logout = () => {
    cookie.remove('id', {path: '/'});
    cookie.remove('name', {path: '/'});
    cookie.remove('password', {path: '/'});
    window.location.href = '/';
  }

  render(){
    return(
      <div>
        <Router>
          <div id="nav" className="d-flex">
            {(cookie.get('id') === undefined) ? (
              <div className="ms-auto me-2">
                <Link to="/login" >Iniciar Sesion</Link>
                <span> | </span>
                <Link to="/register">Registrarse</Link>
              </div>) : (
              <div className="ms-auto me-2">
                <button className="btn btn-link" onClick={this.logout}>Cerrar Sesion</button>
              </div>
            )}
          </div>
          <Routes>
            <Route path="/" element={<Search />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App;
