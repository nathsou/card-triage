import React, { useState } from 'react';
import { CardProps } from './components/Card';
import { CardList } from './components/CardList';
import { useCards, CardsStatus } from './hooks/useCards';
import partition from 'lodash/partition';

const App = () => {
  const { cards, status: cardsStatus } = useCards();
  console.log(cards);

  const [todo, setTodo] = useState<CardProps[]>([]);
  const [done, setDone] = useState<CardProps[]>([]);
  const [cardsSorted, setCardsSorted] = useState(false);

  if (!cardsSorted && cardsStatus === CardsStatus.READY) {
    const [done, todo] = partition(cards, ({status}) => status === 'DONE');
    setTodo(todo);
    setDone(done);
    setCardsSorted(true);
  }

  return <div className='columns-container'>
    <CardList key='todo' cards={todo} header='Todo'/>
    <CardList key='done' cards={done} header='Done'/>
  </div>;
};

export default App;
