import React, {
  useState,
  useEffect,
  useDebugValue,
  useMemo,
  createContext,
  useContext,
} from 'react';

export type Orientation = {
  isValid: boolean;
  isPortrait: boolean | null;
  isLandscape: boolean | null;
}

export type Viewport = {
  width: number;
  height: number;
}

export type BreakpointState = {
  isUnder: boolean;
  isOver: boolean;
}

export type BreakpointConfig = {
  mobile: number;
  tablet: number;
  desktop: number;
}

export type Breakpoints = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLarge: boolean;
}

export type BreakpointsMQ = {
  mobile: string;
  minMobile: string;
  maxMobile: string;
  tablet: string;
  minTablet: string;
  maxTablet: string;
  desktop: string;
  minDesktop: string;
  maxDesktop: string;
  large: string;
  minLarge: string;
  maxLarge: string;
}

export const useOrientation = (): Orientation => {
  const [angle, setAngle] = useState(parseInt('nope', 10));
  useEffect(
    () => {
      const handler = (): void => setAngle(parseInt(`${window.orientation}`, 10));
      window.addEventListener('orientationchange', handler);
      setTimeout(handler, 500);
      return (): void => window.removeEventListener('orientationchange', handler);
    },
    [setAngle],
  );
  const isValid = useMemo(
    () => !Number.isNaN(angle),
    [angle],
  );
  const isPortrait = useMemo(
    () => (!isValid ? null : angle % 180 === 0),
    [isValid, angle],
  );
  const isLandscape = useMemo(
    () => (!isValid ? null : !isPortrait),
    [isValid, isPortrait],
  );
  useDebugValue(
    (angle === 0 && 'portrait')
    || (Math.abs(angle) === 90 && 'landscape')
    || (angle === 180 && 'protrait upside down')
    || 'unknown',
  );
  return {
    isValid,
    isPortrait,
    isLandscape,
  };
};

const getSize = (): Viewport => ({
  width: window.innerWidth,
  height: window.innerHeight,
});
export const ViewportContext = createContext<Viewport>(getSize());

export const useViewport = (): Viewport => {
  const [size, setSize] = useState(getSize());
  useEffect(
    () => {
      const handler = (): void => setSize(getSize());
      window.addEventListener('resize', handler);
      handler();
      return (): void => window.removeEventListener('resize', handler);
    },
    [setSize],
  );
  useDebugValue(`(${size.width}, ${size.height})`);
  return size;
};

export const ViewportProvider: React.FC = ({ children }) => {
  const context = useViewport();
  return (
    <ViewportContext.Provider value={context}>
      {children}
    </ViewportContext.Provider>
  );
};

export const useBreakpoint = (breakpoint: number): BreakpointState => {
  const [width, setWidth] = useState(0);
  const { isValid, isPortrait } = useOrientation();
  useEffect(
    () => {
      const handler = (): void => setWidth(
        !isValid || isPortrait
          ? window.innerWidth
          : window.innerHeight,
      );
      window.addEventListener('resize', handler);
      handler();
      return (): void => window.removeEventListener('resize', handler);
    },
    [setWidth, isValid, isPortrait],
  );
  const isUnder = useMemo(
    () => width < breakpoint,
    [width, breakpoint],
  );
  const isOver = useMemo(
    () => width > breakpoint,
    [width, breakpoint],
  );
  useDebugValue(
    [
      (isOver && 'Over') || (isUnder && 'Under') || 'Exactly',
      breakpoint,
    ].join(' '),
  );
  return {
    isUnder,
    isOver,
  };
};

export const useBreakpointWithViewport = (breakpoint: number): BreakpointState => {
  const viewport = useContext(ViewportContext);
  const { isValid, isPortrait } = useOrientation();
  const width = useMemo(
    () => (!isValid || isPortrait
      ? window.innerWidth
      : window.innerHeight
    ),
    [isValid, isPortrait, viewport],
  );
  const isUnder = useMemo(
    () => width < breakpoint,
    [width, breakpoint],
  );
  const isOver = useMemo(
    () => width > breakpoint,
    [width, breakpoint],
  );
  useDebugValue(
    [
      (isOver && 'Over') || (isUnder && 'Under') || 'Exactly',
      breakpoint,
    ].join(' '),
  );
  return {
    isUnder,
    isOver,
  };
};

export const BreakpointContext = createContext<Breakpoints>({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  isLarge: false,
});

export const useBreakpoints = (breakpoints: BreakpointConfig): Breakpoints => {
  const {
    isOver: mobileIsOver,
    isUnder: mobileIsUnder,
  } = useBreakpointWithViewport(breakpoints.mobile);
  const {
    isOver: tabletIsOver,
    isUnder: tabletIsUnder,
  } = useBreakpointWithViewport(breakpoints.tablet);
  const { isOver: desktopIsOver } = useBreakpointWithViewport(breakpoints.desktop);
  const isMobile = useMemo(
    () => mobileIsUnder,
    [mobileIsUnder],
  );
  const isTablet = useMemo(
    () => mobileIsOver && tabletIsUnder,
    [mobileIsOver, tabletIsUnder],
  );
  const isDesktop = useMemo(
    () => tabletIsOver,
    [tabletIsOver],
  );
  const isLarge = useMemo(
    () => desktopIsOver,
    [desktopIsOver],
  );
  useDebugValue(
    (isMobile && 'mobile')
    || (isTablet && 'tablet')
    || (isDesktop && 'desktop')
    || (isLarge && 'large')
    || 'unknown',
  );
  return {
    isMobile,
    isTablet,
    isDesktop,
    isLarge,
  };
};

export function withBreakpoints<T, K = Omit<T, keyof Breakpoints>>(
  Comp: React.ComponentType<T>,
): React.FC<K> {
  return (props: K): React.ReactElement<T> => {
    const data: Breakpoints = useContext(BreakpointContext);
    const fullProps = ([
      ...Object.entries(props),
      ...Object.entries(data),
    ]
      .reduce(
        (prev, [key, value]) => ({ ...prev, [key]: value }),
        {},
      ) as T);
    return (<Comp {...fullProps} />);
  };
}

export const BreakpointsProviderPartial: React.FC<{
  breakpoints: BreakpointConfig;
}> = ({
  breakpoints,
  children,
}) => {
  const context = useBreakpoints(breakpoints);
  return (
    <BreakpointContext.Provider value={context}>
      {children}
    </BreakpointContext.Provider>
  );
};

export const BreakpointsProvider: React.FC<{
  breakpoints: BreakpointConfig;
}> = ({
  breakpoints,
  children,
}) => (
  <ViewportProvider>
    <BreakpointsProviderPartial breakpoints={breakpoints}>
      {children}
    </BreakpointsProviderPartial>
  </ViewportProvider>
);

export const useIsMobile = (): boolean => {
  const { isMobile } = useContext(BreakpointContext);
  useDebugValue(
    isMobile ? 'yes' : 'no',
  );
  return isMobile;
};

export const useIsTablet = (): boolean => {
  const { isTablet } = useContext(BreakpointContext);
  useDebugValue(
    isTablet ? 'yes' : 'no',
  );
  return isTablet;
};

export const useIsDesktop = (): boolean => {
  const { isDesktop } = useContext(BreakpointContext);
  useDebugValue(
    isDesktop ? 'yes' : 'no',
  );
  return isDesktop;
};

export const useIsLarge = (): boolean => {
  const { isLarge } = useContext(BreakpointContext);
  useDebugValue(
    isLarge ? 'yes' : 'no',
  );
  return isLarge;
};

export const makeBreakpoints = (breakpoints: BreakpointConfig): BreakpointsMQ => {
  const breakpointList = Object.entries(breakpoints).sort(([, v1], [, v2]) => v1 - v2);
  const bps = {
    ...breakpointList
      .reduce(
        (prev, current, index, array) => ({
          ...prev,
          [current[0]]:
            (index === 0 && `@media (max-width: ${current[1]}px)`)
            || (`@media (min-width: ${array[index - 1][1]}) and (max-width: ${current[1]}px)`),
        }),
        { large: `@media (min-width:  ${breakpointList[breakpointList.length - 1][1]}px)` },
      ),
    ...breakpointList
      .reduce(
        (prev, [key, value]) => ({
          ...prev,
          [`min${key[0].toUpperCase()}${key.substr(1)}`]: `@media (min-width: ${value}px)`,
          [`max${key[0].toUpperCase()}${key.substr(1)}`]: `@media (max-width: ${value}px)`,
        }),
        {},
      ),
  };
  return (bps as BreakpointsMQ);
};
