import React, { useMemo } from 'react';
import { Card, CardProps } from './Card';
import '../styles/card.css';

export interface ColumnProps {
    header: string,
    cards: CardProps[],
    onCardStatusChanged: (card: CardProps) => void,
    filter: string
};

const shouldShowCard = (filter: string) => (card: CardProps) => {
    return card.patient_name.toLowerCase().startsWith(filter) ||
        card.arrhythmias.some(arrythmia => arrythmia.toLowerCase().startsWith(filter));
};

export const CardList = (props: ColumnProps) => {
    const filteredCards = useMemo<CardProps[]>(() => {
        return props.cards.filter(shouldShowCard(props.filter));
    }, [props.cards, props.filter]);

    if (filteredCards.length === 0) {
        return null;
    }

    return <div className='card-list'>
        <h2>{props.header}</h2>
        {filteredCards.map(card =>
            <Card
                key={card.id}
                {...card}
                onStatusChanged={() => props.onCardStatusChanged(card)}
            />
        )}
    </div>;
};