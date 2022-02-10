import axios from 'axios';
import React, { useState } from 'react';

function saveCommerce(nombre,localidad,direccion,numero,rubro){
    axios.post('/addCommerce',{
        nombre: nombre, 
        localidad: localidad, 
        direccion: direccion, 
        numero: numero, 
        rubro: rubro
    });
}

function AddCommerce (){
    const [nombre,setNombre] = useState('');
    const [localidad,setLocalidad] = useState('');
    const [direccion,setDireccion] = useState('');
    const [numero,setNumero] = useState(0);
    const [rubro,setRubro] = useState('');
    const [sended,setSended] = useState(false)

    if(!sended){
        return (
            <div className="row">
                <h2>Este es el from para agregar comercio...</h2>
                <div className="card">
                    <div class="row mt-2">
                        <div class="col col-4 text-end">Nombre</div>
                        <div class="col col-5">
                            <input class="form-control" onChange={(e) => setNombre(e.target.value)} type="text"/>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col col-4 text-end">Localidad</div>
                        <div class="col col-5">
                            <input class="form-control" onChange={(e) => setLocalidad(e.target.value)} type="text"/>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col col-4 text-end">Direccion</div>
                        <div class="col col-5">
                            <input class="form-control" onChange={(e) => setDireccion(e.target.value)} type="text"/>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col col-4 text-end">Numero</div>
                        <div class="col col-5">
                            <input class="form-control" onChange={(e) => setNumero(e.target.value)} type="number"/>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col col-4 text-end">Rubro</div>
                        <div class="col col-5">
                            <input class="form-control" onChange={(e) => setRubro(e.target.value)} type="text"/>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center">
                        <button type="button" className="btn btn-success col col-2 m-2" onClick={() => {setSended(true);saveCommerce(nombre,localidad,direccion,numero,rubro)}}>Crear</button>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div class="alert alert-success" role="alert">
                <strong>Muchas gracias por su aporte. El comercio ha sido agregado a nuestra base de datos.</strong>
            </div>
        )
    }
}

export default AddCommerce;