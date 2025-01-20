import { useState, useEffect } from 'react';
import getSavedIntervalTime from '@/utils/IntervalTimeModule';

const useInterval = () => {
    const [savedIntervalValue, setSavedIntervalValue] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchInterval = async () => {
            const interval = await getSavedIntervalTime();
            setSavedIntervalValue(interval?.toString() || '5');
        };
        fetchInterval();
    }, []);

    const handleIntervalChange = (text: string) => {
        setSavedIntervalValue(text);
    };

    return { savedIntervalValue, handleIntervalChange };
};

export default useInterval;