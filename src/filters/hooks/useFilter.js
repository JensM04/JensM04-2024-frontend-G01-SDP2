import {
    useCallback,
    useEffect,
    useReducer,
    useState
} from "react";
import {
    useSearchParams
} from "react-router-dom";

const constructQueryString = (searchParams) => {
    const result = searchParams.entries().toArray().map(
        ([key, value]) => `${key}=${value}` 
    ).join("&");
    return result;
};

export default function useFilter(
    startSearchParams = [],
) {
    const [searchParams, setSearchParams] = useSearchParams(startSearchParams);
    const [queryString, setQueryString] = useState(constructQueryString(searchParams));
    const [resetSignal, sendResetSignal] = useReducer(el => el + 1, 0)

    // indien een filter wordt aangepast, roep buildquerystring op om het naar de backend te sturen
    const changeFilter = useCallback((id, value) => {
        setSearchParams(sf => {
            if (value.length > 0)
                sf.set(id, value);
            else
                sf.delete(id)
            return sf;
        })
    }, [setSearchParams]);

    // Hierbij wordt de query string gerefactord naar nieuwe waarden
    const buildQueryString = useCallback(() => {
        setQueryString(constructQueryString(searchParams));
    }, [setQueryString, searchParams]);

    const resetFilters = useCallback(() => {
        setSearchParams(searchParams => {
            const keys = searchParams.keys();
            for(const key of keys.toArray()) {
                if(key !== 'rijen' && key !== 'pagina') {
                    searchParams.delete(key);
                }
            }
            return searchParams;
        })
        sendResetSignal()
    }, [setSearchParams, sendResetSignal]);

    // zorgt ervoor dat url in browser correct staat na laden
    useEffect(() => {setSearchParams(sp => sp)}, [searchParams, setSearchParams]);
    useEffect(() => {buildQueryString()}, [resetSignal, buildQueryString])

    return {
        filters: searchParams,
        changeFilter,
        handleFilterConfirm: buildQueryString,
        queryString,
        buildQueryString,
        resetFilters,
        resetSignal,
    }
}