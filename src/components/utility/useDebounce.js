import { useRef, useEffect } from "react";

export function useDebounce(func, delay = 1000) {
  const timerRef = useRef(null);

  useEffect(() => {
    // Cleanup function to clear the timeout when the component unmounts
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const debouncedFunction = (...args) => {
    // Clear the previous timer if it exists
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Create a new timer
    timerRef.current = setTimeout(() => {
      // Call the provided function with the latest arguments after the delay
      func(...args);
    }, delay);
  };

  // Return the debounced function
  return debouncedFunction;
}
