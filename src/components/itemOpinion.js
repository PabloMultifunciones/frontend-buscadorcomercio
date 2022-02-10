import React from 'react';

function ItemOpinion(props){
    return (
        <div className="card mt-3 p-2">{props.opinion.descripcion}</div>
    )
}

export default ItemOpinion;