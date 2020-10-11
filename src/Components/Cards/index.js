import React from 'react';
import './cards.css'

function Cards(props) {
    const {count, label} = props
    return (
        <div className="cards">
            <div className="card-count">{count}</div>
            <div className="card-label"> {label} </div>
        </div>
    )
}

export default Cards
