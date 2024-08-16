import Input from '@mui/material/Input';
import { useFilter } from '../contexts/Filter.context';
import { useCallback, useEffect, useState } from 'react';

export default function TableFilter({
    filterKey,
    ...rest
}) {
    const {filters, changeFilter, resetSignal, isFilterConfirmSignal
    } = useFilter();

    const [value, setValue] = useState(filters.has(filterKey) && filters.get(filterKey) || "");

    const handleChange = useCallback((event) => {
        const value = event.target.value;
        setValue(value);
    }, [setValue])


    useEffect(() => {
        if(isFilterConfirmSignal()) {
            changeFilter(filterKey, value);
        }
    }, [isFilterConfirmSignal, changeFilter, filterKey, value])

    useEffect(() => {
        setValue(filters.has(filterKey) && filters.get(filterKey) || "");
    }, [resetSignal, filters, setValue, filterKey]);

    return (<>
        <Input
            onChange={handleChange}
            value={value}
            placeholder='filter...'
            {...rest}
        />
    </>)
}