import React, { useCallback, useState } from 'react';
import { CardProps } from './components/Card';
import { CardList } from './components/CardList';
import { useCards, CardsStatus } from './hooks/useCards';
import partition from 'lodash/partition';
import { FilterBar } from './components/FilterBar';
import './styles/content.css';

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

  const onCardStatusChanged = useCallback((card: CardProps) => {
    if (card.status === 'DONE') { // The card was rejected
      // remove this card from the done cards
      setDone(done.filter(c => c.id !== card.id));

      // Update the card to 'rejected'
      setTodo([...todo, {...card, status: 'REJECTED'}]);
    } else { // The card is now pending
      // remove this card from the todo cards
      setTodo(todo.filter(c => c.id !== card.id));

      // Update the card to 'done'
      setDone([...done, {...card, status: 'DONE'}]); 
    }
  }, [todo, done, setTodo, setDone]);

  const [filter, setFilter] = useState('');
  const onFilter = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, [setFilter]);

  return (
    <div className='content'>
      <FilterBar input={filter} onUpdate={onFilter}/>

      <hr style={{borderColor: "black"}}/>

      <div className='columns-container'>
          <CardList
            key='todo'
            cards={todo}
            header='Todo'
            filter={filter.toLowerCase()}
            onCardStatusChanged={onCardStatusChanged}
          />

          <CardList
            key='done'
            cards={done}
            header='Done'
            filter={filter.toLowerCase()}
            onCardStatusChanged={onCardStatusChanged}
          />
      </div>
    </div>
  );
};

export default App;
