import React, { useCallback, useRef } from 'react';
import '../styles/filterBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface FilterBarProps {
    input: string
    onUpdate: (newInput: string) => void
};

export const FilterBar = ({ input, onUpdate }: FilterBarProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const update = useCallback(() => {
        if (inputRef.current !== null) {
            onUpdate(inputRef.current.value);
        }
    }, [onUpdate, inputRef]);

    return <div className='filter-box'>
        <input
            ref={inputRef}
            type='text'
            placeholder='Filter by name'
            className='filter-bar'
            value={input}
            onKeyPress={update}
            onChange={update}
        />
        <FontAwesomeIcon icon='search' size='lg'/>
    </div>;
};