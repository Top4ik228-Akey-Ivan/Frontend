import React from "react";
import './../styles/result.css'
import image from './../img/result.png'

function Result ({correct, data}) {
    return (
        <div className="result">
            <div className="result__box">
                <h3 className="text">Вы ответили правильно на {correct} вопроса из {data.length}</h3>
                <img className="img" src={image} alt="" />
            </div>
        </div>
    )
}

export default Result