import React from "react";

export default function Die (props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div 
            className="die" 
            style={styles}
            onClick={props.onClick}
        >
            <h2 className="die-text">{props.value}</h2>
        </div>
    )
}

