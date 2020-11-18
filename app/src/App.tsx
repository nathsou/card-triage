import React, { useCallback, useState } from 'react';
import { Columns } from './components/Columns';
import { FilterBar } from './components/FilterBar';
import './styles/content.css';
import { faLongArrowAltRight, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faLongArrowAltRight, faLongArrowAltLeft, faSearch);

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
