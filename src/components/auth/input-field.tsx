import React from "react";

const InputField = ({
  error,
  fieldName,
  value,
  setValue,
  placeholder,
  type = "text",
  required = true,
}: {
  required?: boolean;
  fieldName: string;
  type?: string;
  placeholder: string;
  value: string;
  error?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="text-xs ml-1">{fieldName}</label>
      <input
        className="outline-none bg-foreground p-2 rounded-lg text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        required={required}
      />
      {error && (
        <label className="text-xs ml-1 text-red-500 -mt-2">{error}</label>
      )}
    </div>
  );
};

export default InputField;
