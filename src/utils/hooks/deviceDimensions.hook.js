import { useState, useEffect, useCallback, useMemo } from 'react';

const MOBILE_MAX_WIDTH = 768;
const TABLET_MAX_WIDTH = 1024;

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const isMobile = (width) => {
    return width <= MOBILE_MAX_WIDTH;
}

const isTablet = (width) => {
    return MOBILE_MAX_WIDTH < width && width <= TABLET_MAX_WIDTH;
}

const isDesktop = (width) => {
    return TABLET_MAX_WIDTH < width;
}

export default function useDeviceDimensions () {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const {width, height} = useMemo(() => windowDimensions, [windowDimensions]);

    return {
        isMobile: useCallback(() => isMobile(width), [width]),
        isTablet: useCallback(() => isTablet(width), [width]),
        isDesktop: useCallback(() => isDesktop(width), [width]),
        width,
        height,
    }
}