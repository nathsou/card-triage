import React from 'react';
import { Card, CardProps } from './Card';

export interface ColumnProps {
    cards: CardProps[]
};

export const CardColumn = (props: ColumnProps) => {
    return <div>
        {props.cards.map(card => <Card {...card}/>)}
    </div>;
};