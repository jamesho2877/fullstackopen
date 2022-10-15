import { useState } from "react";

export const useField = (type) => {
  const initValue = "";
  const [value, setValue] = useState(initValue);
  const onChange = (e) => setValue(e.target.value);
  const reset = () => setValue(initValue);
  return { type, value, onChange, reset };
};
