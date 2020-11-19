import React from 'react';
import { useSortedCards } from "../hooks/useSortedCards";
import { CardList } from "./CardList";

export interface ColumnsProps {
    filter: string
};

export const Columns = ({ filter }: ColumnsProps) => {
    const { done, todo, onCardStatusChanged } = useSortedCards();

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