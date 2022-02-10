import React , { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './login.css';

const cookies = new Cookies();

class Login extends Component{
    state = {
        name: "",
        password : "",
        error: false
    }

    constructor(props){
        super(props);
        if(cookies.get('id') !== undefined) window.location.href = "/";
    }

    existUser = () => {
        axios.post('/existUser',{name : this.state.name , password : this.state.password})
        .then(response => {
            if(response.data.success === false){
                this.setState({error : true});
            }else{
                cookies.set('id', response.data.id, {path : '/'});
                cookies.set('name', response.data.name, {path : '/'});
                cookies.set('password', response.data.password, {path : '/'});
                window.location.href = "/";
            }
        })
        .catch(error => {
            throw error;
        });
    }

    changeName = (e) => {
        this.setState({name : e.target.value});
    }

    changePassword = (e) => {
        this.setState({password : e.target.value});
    }

    render(){
        return(
            <div className="container">
                <div id="register" className="col col-4 offset-4">
                    <div id="register-header">
                        <h2 className="text-center">Iniciar Sesion</h2>
                    </div>
                    <div className="row p-3">
                        <form>
                            <input className="form-control mt-3" type="text" placeholder="Nombre" onChange={this.changeName}/>
                            <input className="form-control mt-3" type="password" placeholder="Contraseña" onChange={this.changePassword}/>
                            {this.state.error ? (
                                <div className="alert alert-danger mt-3" role="alert">
                                    <strong>Nombre o contraseña incorrectos.</strong>
                                </div>
                            ) : (<></>)}
                            <div className="text-center">
                                <button type="button" className="btn btn-primary mt-3" onClick={this.existUser}>Iniciar Sesion</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;