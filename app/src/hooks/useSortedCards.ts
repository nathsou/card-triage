import partition from 'lodash/partition';
import { useCallback, useState } from "react";
import { CardProps, Status } from "../components/Card";
import { CardsStatus, useCards } from "./useCards";
import { useLocalStorage } from "./useLocalStorage";

type StatusMap = { [key: number]: Status };

const getStatusById = (cards: CardProps[]): StatusMap => {
    const statusMap: StatusMap = {};

    for (const { id, status } of cards) {
        statusMap[id] = status;
    }

    return statusMap;
};

export const useSortedCards = () => {
    const { cards, status: cardsStatus } = useCards();

    const [todo, setTodo] = useState<CardProps[]>([]);
    const [done, setDone] = useState<CardProps[]>([]);
    const [cardsSorted, setCardsSorted] = useState(false);
    const [statusById, setStatusById] = useLocalStorage(
        'statusById',
        () => getStatusById(cards)
    );

    // sort the cards (pending, done, rejected)
    if (!cardsSorted && cardsStatus === CardsStatus.READY) {
        // update the fetched cards with the persisted status
        const persistedCards = cards.map(c =>
            ({ ...c, status: statusById[c.id] ?? c.status })
        );

        // partition the cards into the two columns (pending or rejected, done)
        const [done, todo] = partition(persistedCards, ({ status }) => status === 'DONE');

        setTodo(todo);
        setDone(done);
        setCardsSorted(true);
    }

    const onCardStatusChanged = useCallback((card: CardProps) => {
        if (card.status === 'DONE') { // The card was rejected
            // remove this card from the done cards
            setDone(done.filter(c => c.id !== card.id));

            // Update the card to 'rejected'
            setTodo([...todo, { ...card, status: 'REJECTED' }]);

            // persist the new status
            setStatusById({ ...statusById, [card.id]: 'REJECTED' });
        } else { // The card is now pending
            // remove this card from the todo cards
            setTodo(todo.filter(c => c.id !== card.id));

            // Update the card to 'done'
            setDone([...done, { ...card, status: 'DONE' }]);

            // persist the new status
            setStatusById({ ...statusById, [card.id]: 'DONE' });
        }
    }, [todo, done, setTodo, setDone, statusById, setStatusById]);

    return { todo, done, onCardStatusChanged };
};