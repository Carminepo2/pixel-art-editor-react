import debounce from "lodash.debounce";
import React from "react";

function useDebounce<T extends any[]>(cb: (...args: T) => void, delay: number = 200) {
  return React.useMemo(() => debounce(cb, delay), []);
}
export default useDebounce;
