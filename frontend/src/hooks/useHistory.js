import { useEffect, useState } from "react";

const useHistory = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    if (value !== initialValue) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, initialValue]);

  return [value, setValue];
};

export default useHistory;
