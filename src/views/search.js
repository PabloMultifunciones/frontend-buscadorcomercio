import React , { Component } from 'react';
import ItemCommerce from '../components/itemCommerce.js';
import SendOpinion from '../components/sendOpinion.js';
import ItemOpinion from '../components/itemOpinion.js';
import AddCommerce from '../components/addCommerce.js';
import axios from 'axios';
import './search.css';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

class Search extends Component{
    state = {
        search : "",
        results : [],
        commerce : null,
        notFound : false,
        showSendOpinion: false,
        opinions: [],
        myLastThreeOpinions: []
    }

    componentDidMount(){
        if(cookie.get('id') !== undefined){
            axios.get(`/getLastThreeOpinions/${cookie.get('id')}`)
            .then(response => {
                this.setState({opinions : response.data});
            });
        }
    }

    request = async () => {
        this.setState({commerce : null});
        await axios.get(`/search/${this.state.search}`)
        .then(response => {
            if(response.data.length > 0){
                this.setState({results : response.data, notFound : false});
            }else{
                this.setState({notFound : true});
            }
        });
    }

    getOpinions = (id_commerce) => {
        axios.get(`/getOpinions/${id_commerce}`)
        .then(results => {
            this.setState({opinions : results.data});
        })
    }

    saludar = (commerce) => {
        this.setState({commerce: commerce});
        this.getOpinions(commerce.id)
    }

    showSendOpinion = () => {
        this.setState({showSendOpinion : true})
    }

    closeCommerce = () => {
        this.setState({commerce : null, showSendOpinion : false});
    }

    changeSearch = (e) =>{
        this.setState({search : e.target.value});
    }

    render(){
        return(
            <div className="container">
                <div id="search">
                    <div className="row">
                        <form>
                            <div className="input-group mb-3">
                                <input className="form-control" type="text" onChange={this.changeSearch} placeholder="Ej: La herradura" />
                                <button className="btn btn-outline-primary" type="button" onClick={this.request} id="button-addon2">Buscar</button>
                            </div>
                        </form>
                    </div>
                    {(this.state.commerce) 
                    ? (
                    <div id="card" className="card m-3 border border-primary border-5 border-end-0 border-bottom-0 border-top-0 p-2">
                        <div className="d-flex">
                            <h1>{this.state.commerce.nombre}</h1>
                            <button id="buttonClose" className="btn btn-danger ms-auto" onClick={this.closeCommerce}>x</button>
                        </div>
                        <h2>{this.state.commerce.rubro}</h2>
                        <h3>Localidad: {this.state.commerce.localidad}</h3>
                        <h3>Direccion: {this.state.commerce.direccion}</h3>
                        <div className="d-flex">
                            <h3>Numero: {this.state.commerce.numero}</h3>
                            {
                            (this.state.showSendOpinion === false) 
                                ? (<button onClick={this.showSendOpinion} className="btn btn-primary ms-auto">Opinar</button>) 
                                : <></>
                            }
                        </div>
                        {(this.state.showSendOpinion === false && this.state.commerce !== null) ? this.state.opinions.map(opinion => <ItemOpinion opinion={opinion} key={opinion.id} />) : <></>}
                        {(this.state.showSendOpinion) ? <SendOpinion id_commerce={this.state.commerce.id} /> : <></>}
                    </div>
                    )
                    : (
                    <div className="row">
                        {
                        (this.state.notFound === false) 
                            ? this.state.results.map(commerce => <ItemCommerce commerce={commerce} saludar={this.saludar} key={commerce.id} />) 
                            : <AddCommerce />
                        }
                    </div>
                    )
                    }
                </div>
            </div>
        );
    }
}

export default Search;