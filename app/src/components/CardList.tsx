import React from 'react';
import { Card, CardProps } from './Card';
import '../styles/card.css';

export interface ColumnProps {
    header: string,
    cards: CardProps[],
    onCardStatusChanged: (cardId: number) => void
};

export const CardList = (props: ColumnProps) => {
    return <div className='card-list'>
        <h2>{props.header}</h2>
        {props.cards.map(card =>
            <Card
                key={card.id}
                {...card}
                onStatusChanged={() => props.onCardStatusChanged(card.id)}
            />
        )}
    </div>;
};