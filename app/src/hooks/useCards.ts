import { useState } from "react";
import { CardProps } from "../components/Card";
import { CONFIG } from "../config";

export enum CardsStatus { READY, FETCHING, ERROR, IDLE };

// TODO: Validate the schema
/**
 * helper function to fetch cards
 * this could easily be generalised to fetch any json data
 * @param  {string} endpointUri
 * @returns a Promise with the cards array data
 */
const fetchCards = async (endpointUri: string): Promise<CardProps[]> => {
    return new Promise<CardProps[]>(async (resolve, reject) => {
        try {
            // the fetch API is not yet available in all common browsers
            // we could use a npm module like 'axios' instead
            const res = await fetch(endpointUri);

            // everything is fine
            if (res.status === 200) {
                const cards = await res.json();
                resolve(cards);
            } else {
                reject(`An error occured : status code ${res.status}`);
            }

        } catch (exception) {
            reject(`Unable to fetch the patient cards from ${endpointUri}`);
        }
    });
};

/**
 * a hook to fetch cards data from the API
 * returns an empty array if no data was fetched yet
 * or if an error occured
 */
export const useCards = (): { cards: CardProps[], status: CardsStatus } => {
    const [cards, setCards] = useState<CardProps[]>([]);
    const [status, setStatus] = useState<CardsStatus>(
        CardsStatus.IDLE
    );

    // fetch the cards if this is the first render
    if (status === CardsStatus.IDLE) {
        setStatus(CardsStatus.FETCHING);

        fetchCards(CONFIG.CARDS_ENDPOINT).then(fetchedCards => {
            // sort the cards by ascending creation date
            setCards(fetchedCards.sort((c1, c2) =>
                new Date(c1.created_date).getTime() - new Date(c2.created_date).getTime())
            );
            setStatus(CardsStatus.READY);
        }).catch(error => {
            // TODO: Handle errors (display a message to the user)
            console.error(error);
            // update status
            setStatus(CardsStatus.ERROR);
        });
    }

    return { cards, status };
};