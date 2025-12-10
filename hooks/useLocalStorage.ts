import { useState, useEffect, Dispatch, SetStateAction } from 'react';

/**
 * Custom hook for managing localStorage with React state
 * Automatically syncs state with localStorage and handles JSON serialization
 * 
 * @param key - The localStorage key
 * @param initialValue - The initial value if key doesn't exist
 * @returns [storedValue, setValue] - Tuple of value and setter function
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error saving localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

