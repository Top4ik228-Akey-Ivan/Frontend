import { useEffect, useState } from "react";
import initialCards from "./initialCards";
import Board from "./components/board";
import GameInfo from "./components/gameInfo";
import './app.css'

function App() {
  const [cards, setCards] = useState(initialCards);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setCards(shuffleCards(initialCards));
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsDisabled(true);
      const [first, second] = flippedCards;
      if (cards[first].image === cards[second].image) {
        setMatchedCards([...matchedCards, first, second]);
        setFlippedCards([]);
        setIsDisabled(false);
      } else {
        setTimeout(() => {
          const newCards = cards.map((card, index) => {
            if (index === first || index === second) {
              card.isFlipped = false;
            }
            return card;
          });
          setCards(newCards);
          setFlippedCards([]);
          setIsDisabled(false);
        }, 1000);
      }
    }
  }, [cards, flippedCards, matchedCards]);

  const hadleCardClick = (index) => {
    if (
      isDisabled ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    )
      return;
    const newCards = cards.map((card, i) => {
      if (i === index) {
        card.isFlipped = true;
      }
      return card;
    });
    setCards(newCards);
    setFlippedCards([...flippedCards, index]);
  };

  const resetGame = () => {
    const resetCards = initialCards.map((card) => ({
      ...card,
      isFlipped: false,
    }));
    setCards(shuffleCards(resetCards));
    setFlippedCards([]);
    setMatchedCards([]);
    setIsDisabled(false);
  };

  const shuffleCards = (cards) => {
    return cards.sort(() => Math.random() - 0.5);
  };
  return (
    <div className="app">
      <h1>Memory Game</h1>
      <Board cards={cards} onCardClick={hadleCardClick} />
      <GameInfo matchedCards={matchedCards} onReset={resetGame} />
    </div>
  );
}

export default App;