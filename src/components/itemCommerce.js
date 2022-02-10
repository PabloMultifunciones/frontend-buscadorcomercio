import React, { Component } from 'react';
import './itemCommerce.css';

class ItemCommerce extends Component{

    saludar = () =>{
        this.props.saludar(this.props.commerce);
    }

    render(){
        return (
            <div className="col col-4">
                <div id="miniCard" onClick={this.saludar} className="card m-3 border border-primary border-5 border-end-0 border-bottom-0 border-top-0 p-2">
                    <h3>{this.props.commerce.nombre}</h3>
                    <p>{this.props.commerce.rubro}</p>
                </div>
            </div>
        )
    }
}

export default ItemCommerce;