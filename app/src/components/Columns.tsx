import React from 'react';
import { useFilteredCards } from "../hooks/useFilteredCards";
import { CardList } from "./CardList";

export interface ColumnsProps {
    filter: string
};

export const Columns = ({ filter }: ColumnsProps) => {
    const { done, todo, onCardStatusChanged } = useFilteredCards();

    return <div className='columns-container'>
        <CardList
            key='todo'
            cards={todo}
            header='Todo'
            filter={filter}
            onCardStatusChanged={onCardStatusChanged}
        />

        <CardList
            key='done'
            cards={done}
            header='Done'
            filter={filter}
            onCardStatusChanged={onCardStatusChanged}
        />
    </div>;
};