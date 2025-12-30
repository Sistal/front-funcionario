import React from "react";

export function Checkbox({ className, checked, onChange, id }) {
  return (
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange && onChange(e.target.checked)}
      className={
        "h-4 w-4 rounded-sm border border-gray-200 bg-white text-blue-600 focus:outline-none " +
        (className || "")
      }
    />
  );
}

export default Checkbox;

