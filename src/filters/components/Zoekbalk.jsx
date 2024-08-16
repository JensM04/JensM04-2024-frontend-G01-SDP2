
import Stack from '@mui/material/Stack';
import SearchIcon from "@mui/icons-material/Search";
import TekstFilter from "./TekstFilter";
import FilterConfirmButton from './FilterConfirmButton';

export default function Zoekbalk({
    ...rest
}) {
    return (
        <Stack direction='row' spacing={2}>
            <TekstFilter
                filterKey="zoek"
                placeholder="zoek..."
                data-cy="zoekbalk_veld"
                {...rest}
            />
            <FilterConfirmButton
                buttonText="Zoek"
                variant="contained"
                color="primary"
                data-cy="zoek_knop"
                endIcon={<SearchIcon />}
            />
        </Stack>
    );
}