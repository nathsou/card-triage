import React, { useState } from 'react';
import './App.css';
import { CONFIG } from './config';
import { fetchCards } from './Api';
import { Card, CardProps } from './components/Card';
import { CardColumn } from './components/CardColumn';

fetchCards(CONFIG.CARDS_ENDPOINT).then(cards => {
  console.log(cards);
});

enum CardsStatus { READY, FETCHING, ERROR, IDLE };

const App = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [cardsStatus, setCardsStatus] = useState<CardsStatus>(
    CardsStatus.IDLE
  );

  // fetch the cards if this is the first render
  if (cardsStatus === CardsStatus.IDLE) {
    setCardsStatus(CardsStatus.FETCHING);

    fetchCards(CONFIG.CARDS_ENDPOINT).then(fetchedCards => {
      setCards(fetchedCards);
      setCardsStatus(CardsStatus.READY);
    }).catch(error => {
      // TODO: Handle errors (display a message to the user)
      console.error(error);
      // update status
      setCardsStatus(CardsStatus.ERROR);
    });
  }

  return <CardColumn cards={cards}/>;
};

export default App;
