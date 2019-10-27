import "./Cards.css";
import React from "react";

const Cards = (props) =>
{
    console.log(props.info)
    return(
        <div className="card_design">
           <span className="cardInfo">{props.info}</span>
            <div className="button_box">
                <button onClick={props.edit} id={props.id} >edit</button>
                <button onClick={props.remove} id={props.id} >delete</button>
            </div>
        </div>
    )
}
export default Cards;