interface InputFieldType {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldType> = ({
  type,
  name,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-[45px] w-full sm:w-[360px] p-3 border-2 border-green-400 outline-none rounded focus:ring-2 focus:ring-green-300 transition-all duration-300 text-sm sm:text-base"
      />
    </>
  );
};

export default InputField
