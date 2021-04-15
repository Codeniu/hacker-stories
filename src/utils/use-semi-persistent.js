import { useEffect, useState } from 'react';
export const useSemiPersistent = (key, initialState) => {
    const [value, setValue] = useState(
        localStorage.getItem(key) || initialState
    );
    useEffect(() => {
        localStorage.setItem(key, value);
    }, [value, key]);
    return [value, setValue];
};
