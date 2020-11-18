import React, { useState } from 'react';
import { CardProps } from './components/Card';
import { CardList } from './components/CardList';
import { useCards, CardsStatus } from './hooks/useCards';
import partition from 'lodash/partition';

const App = () => {
  const { cards, status: cardsStatus } = useCards();

  const [todo, setTodo] = useState<CardProps[]>([]);
  const [done, setDone] = useState<CardProps[]>([]);
  const [cardsSorted, setCardsSorted] = useState(false);

  if (!cardsSorted && cardsStatus === CardsStatus.READY) {
    const [done, todo] = partition(cards, ({status}) => status === 'DONE');
    setTodo(todo);
    setDone(done);
    setCardsSorted(true);
  }

  // TODO: useMemo
  const onCardStatusChanged = (cardId: number) => {
    console.log(cardId);
  };

  return <div className='columns-container'>
    <CardList
      key='todo'
      cards={todo}
      header='Todo'
      onCardStatusChanged={onCardStatusChanged}
    />

    <CardList
      key='done'
      cards={done}
      header='Done'
      onCardStatusChanged={onCardStatusChanged}
    />
  </div>;
};

export default App;
