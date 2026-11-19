import { useState } from "react";

export default function useToggle(defaultValue = false): [boolean, () => void] {
  const [value, setValue] = useState(defaultValue);

  function toggle() {
    setValue(!value);
  }

  return [value, toggle];
}
