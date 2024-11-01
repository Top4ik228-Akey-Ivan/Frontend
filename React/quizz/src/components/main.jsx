import React from "react";
import './../styles/main.css'




function Main({vopros, onClickVariant, step, data}) {

    const percentage = Math.round(step / data.length * 100)
    console.log(percentage)
    return (
        <div className="paper">
            <div className="main">
                <div className="bar">
                    <div className="line" style={{width: `${percentage}%`}}></div>
                </div>
                <h1 className="question">{vopros.title}</h1>
                <ul>
                    {vopros.answers.map((text, index) => (
                        <li onClick={() => onClickVariant(index)} key={text}>{text}</li>)
                        )}
                </ul>
            </div>
       </div>
    )
}

export default Main