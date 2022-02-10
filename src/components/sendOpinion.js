import React , {useState} from 'react';
import Cookie from 'universal-cookie';
import axios from 'axios';

const cookie = new Cookie();

function saveOpinion(setOpinionSended, opinion, props){
    console.log("opinar");
    setOpinionSended(true);
    axios.post('/saveOpinion',{descripcion : opinion, id_usuario : cookie.get('id'), id_commerce : props.id_commerce})
    .then(response => {
        console.log(response);
    });
}


function SendOpinion(props){
    const [existOpinion, setExistOpinion] = useState(null)
    const [opinion, setOpinion] = useState('');
    const [opinionSended , setOpinionSended] = useState(false);
    
    axios.post('/existOpinion', {usuario_id : cookie.get('id'), comercio_id: props.id_commerce})
    .then(response => {
        setExistOpinion(response.data.success);
    });
    if(existOpinion === null){
        return (
            <div className="alert alert-warning col col-4 offset-4" role="alert">
                <strong>Cargando...</strong>
            </div>
        )
    }else if(opinionSended){
        return (
            <div className="alert alert-success col col-4 offset-4" role="alert">
                <strong>Su opinion fue guardada correctamente</strong>
            </div>
        )
    }else if(existOpinion){
        return (
            <div className="alert alert-warning col col-4 offset-4" role="alert">
                <strong>Usted ya ha opinado sobre este comercio.</strong>
            </div>
        )
    }else if(cookie.get('id') === undefined){
        return (
            <div className="alert alert-warning col col-4 offset-4" role="alert">
                <strong>Para escribir una opinion debe iniciar sesion</strong>
            </div>
        )
    }else{
        return (
            <div>
                <textarea className="form-control mt-2" onChange={(e) => setOpinion(e.target.value)}></textarea>
                <button className="btn btn-primary mt-2" onClick={() => saveOpinion(setOpinionSended,opinion,props)}>Enviar Opinion</button>
            </div>
        )
    }
    
}

export default SendOpinion;