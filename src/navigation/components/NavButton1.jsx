import { useTheme } from "@emotion/react";
import { NavLink } from "react-router-dom";
import { default as MuiLink } from '@mui/material/Link';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function NavButton({ children, to, ...rest }) {
    const theme = useTheme();
    const [isActive, setIsActive] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if(to === location.pathname) setIsActive(true);
        else setIsActive(false)
    }, [location, to]);

    return (
        <MuiLink
            to={to}
            component={NavLink}
            className=".NavLink"
            {...(isActive ? {color: theme.palette.primary.main} : "")}
            {...rest}
        >
            {children}
        </MuiLink>
    );
}