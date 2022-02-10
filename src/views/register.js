import React , { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './register.css';

const cookies = new Cookies();

class Register extends Component{
    state = {
        name: "",
        password : "",
        passwordConfirm : "",
        error: false
    }

    constructor(props){
        super(props);
        if(cookies.get('id') !== undefined) window.location.href = "/";
    }

    register = () => {
        axios.post(`/addUser`,{name: this.state.name , password: this.state.password, passwordConfirm : this.state.passwordConfirm})
        .then((response) => {
            console.log(response)
            if(response.data.success !== false){
                cookies.set('id', response.data.id, {path: '/'});
                cookies.set('name', response.data.name, {path: '/'});
                cookies.set('password', response.data.password, {path: '/'});
                alert('El usuario fue creado con exito');
                window.location.href="/";
            }else{
                this.setState({error : true});
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
    changePasswordConfirm = (e) => {
        this.setState({passwordConfirm : e.target.value});
    }

    render(){
        return(
            <div className="container">
                <div id="register" className="col col-4 offset-4">
                    <div id="register-header">
                        <h2 className="text-center">Registrarse</h2>
                    </div>
                    <div className="row p-3">
                        <form>
                            <input className="form-control mt-3" type="text" placeholder="Nombre" onChange={this.changeName}/>
                            <input className="form-control mt-3" type="password" placeholder="Contraseña" onChange={this.changePassword}/>
                            <input className="form-control mt-3" type="password" placeholder="Confirmar Contraseña" onChange={this.changePasswordConfirm}/>
                            {this.state.error ? (
                                <div className="alert alert-danger mt-3" role="alert">
                                    <strong>Hubo un error al cargar los datos. Verifique:</strong>
                                    <ul>
                                        <li>La contraseña coincida coincida con la de confirmacion.</li>
                                        <li>La contraseña debe tener almenos 5 caracteres.</li>
                                        <li>El usuario debe tener almenos 5 caracteres.</li>
                                    </ul>
                                </div>
                            ) : (<></>)}
                            <div className="text-center">
                                <button type="button" className="btn btn-primary mt-3" onClick={this.register}>Regisrarse</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;