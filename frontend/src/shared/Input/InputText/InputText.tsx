import React, { ChangeEventHandler } from "react";
import "./inputText.css";

type InputTextProps = {
  placeholder?: string;
  className?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};
const InputText = ({
  placeholder,
  className,
  value,
  onChange,
}: InputTextProps) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
    />
  );
};

export default InputText;
