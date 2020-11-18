import React, { useCallback, useState } from 'react';
import { Columns } from './components/Columns';
import { FilterBar } from './components/FilterBar';
import './styles/content.css';

const App = () => {
  const [filter, setFilter] = useState('');
  const onFilter = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, [setFilter]);

  return (
    <div className='content'>
      <FilterBar input={filter} onUpdate={onFilter}/>

      <hr style={{borderColor: "black"}}/>

      <Columns filter={filter.toLowerCase()} />
    </div>
  );
};

export default App;
