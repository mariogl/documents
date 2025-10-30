export const subscribeToMediaQuery = (
  breakpoint: number,
  callback: (isMobile: boolean) => void,
): (() => void) => {
  const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

  const handleMediaQueryChange = (event: MediaQueryListEvent): void => {
    callback(event.matches);
  };

  callback(mediaQuery.matches);

  mediaQuery.addEventListener("change", handleMediaQueryChange);

  return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
};

export default subscribeToMediaQuery;
