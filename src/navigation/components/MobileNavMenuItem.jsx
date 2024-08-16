import { useTheme } from '@emotion/react';
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Typography from '@mui/material/Typography'

export default function MobileNavMenuItem({ children, to, ...props }) {
    const theme = useTheme();
    const [isActive, setIsActive] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (to === location.pathname) setIsActive(true);
        else setIsActive(false)
    }, [location, to]);

    return (
        <MenuItem
            {...props}
            to={to}
        >
            <Typography textAlign="center"
                {...(isActive ? { color: theme.palette.primary.main } : "")}>
                {children}
            </Typography>
        </MenuItem>
    )
}
