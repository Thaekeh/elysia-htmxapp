import { getRandomSeed } from "bun:jsc";
import React from "react";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, ...inputProps }: InputProps) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        className="peer  w-full border rounded-lg p-2 border-purple-700 bg-slate-800 pt-4 pb-4 font-sans text-sm font-normal text-white placeholder-gray-300 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        {...inputProps}
      ></input>
    </div>
  );
};
