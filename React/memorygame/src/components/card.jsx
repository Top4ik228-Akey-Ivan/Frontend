import React from "react";

export default function Card({ index, card, onClick }) {
  return (
    <div
      className={`card ${card.isFlipped ? "flipped" : ""}`}
      onClick={() => onClick(index)}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={card.image} alt="card front of an animal" />
        </div>
        <div className="card-back"></div>
      </div>
    </div>
  );
}