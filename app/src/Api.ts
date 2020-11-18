
import { CardProps } from "./components/Card";

// TODO: Validate the schema
// helper function to fetch cards
// this could easily be generalised to fetch any json data
export const fetchCards = async (endpointUri: string): Promise<CardProps[]> => {
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