import React from 'react';
import { Card, CardProps } from './Card';

export interface ColumnProps {
    cards: CardProps[]
};

export const Column = (props: ColumnProps) => {
    return <div>
        {props.cards.map(card => <Card {...card}/>)}
    </div>;
};