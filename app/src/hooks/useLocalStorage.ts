import { useCallback, useState } from 'react';

// any json value can be serialized
type Serializable =
    string |
    number |
    boolean |
    Serializable[] |
    { [key: string]: Serializable };

/**
 * persists a serializable (json) value identified by a key in the localStorage
 */
export const useLocalStorage = <T extends Serializable>(
    key: string,
    defaultValue: () => T
): [T, (newValue: T) => void] => {
    const [value, setValue] = useState<T>(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
            return JSON.parse(storedValue);
        }

        return defaultValue;
    });

    const updateValue = useCallback((newValue: T) => {
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
    }, [key]);

    // follow the useState API
    return [value, updateValue];
};