import { createContext, useState, useEffect } from 'react';

export const TemperatureContext = createContext();

const STORAGE_KEY = 'temperatureType';

export function TemperatureProvider({ children }) {
    const getInitialValue = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? stored : 'celsius';
    };
    const [temperatureType, setTemperatureType] = useState(getInitialValue);
    useEffect(() => {
    localStorage.setItem(STORAGE_KEY, temperatureType);
    }, [temperatureType]);

    return (
        <TemperatureContext.Provider value={{ temperatureType, setTemperatureType }}>
        {children}
        </TemperatureContext.Provider>
    );
}