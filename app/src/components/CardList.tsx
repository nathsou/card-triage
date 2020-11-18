import React from 'react';
import { Card, CardProps } from './Card';
import '../styles/card.css';

export interface ColumnProps {
    header: string,
    cards: CardProps[]
};

export const CardList = (props: ColumnProps) => {
    return <div className='card-list'>
        <h2>{props.header}</h2>
        {props.cards.map((card, index) => <Card key={index} {...card}/>)}
    </div>;
};