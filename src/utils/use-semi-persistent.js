import { useEffect, useState } from 'react';

/**
 * 半持久化，用于将数据存贮在 localStorge 中
 * @param {key} String key值
 * @param {initialState} any 初始值
 */
export const useSemiPersistent = (key, initialState) => {
    const [value, setValue] = useState(
        localStorage.getItem(key) || initialState
    );
    useEffect(() => {
        localStorage.setItem(key, value);
    }, [value, key]);
    return [value, setValue];
};
