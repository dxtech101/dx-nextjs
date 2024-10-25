"use client";
import * as Icons from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';

const InputField = ({
  type,
  placeHolder,
  iconName,
  label,
  direction,
  isRequired,
  error,
  className = '',
  customTag = false,
  value,
  onChange,
  id
}: any) => {
  const iconMap: any = {
    search: Icons.Search,
    clear: Icons.X,
    user: Icons.User,
    currency: Icons.DollarSign,
  };
  const selectRef = useRef<any>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChevronClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  const IconComponent = iconName ? iconMap[iconName] : null;

  return (
    <div className={`relative flex flex-${direction === "row" ? "row items-center" : "col items-start"} justify-center w-full gap-2`}>
      {label && (
        <div className='w-full flex justify-between items-center'>
          <label className='text-sm font-bold text-gray-700 text-nowrap'>
            {label}{isRequired && <>{" "}*</>}
          </label>
          {error && (
            <span className='text-xs text-red-500 font-bold'>
              {error}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-wrap sm:flex-nowrap w-full">
        <div className={`relative w-full ${customTag ? 'sm:flex-1' : ''}`}>
          <input
            type={type === "password" ? showPassword ? "text" : "password" : type}
            value={value}
            id={id}
            onChange={onChange}
            className={`h-12 pl-4 ${iconName && "pl-[2.5rem]"} ${customTag && "pl-[5rem]"} pr-4 text-black border ${type === "password" && !showPassword && "text-2xl leading-loose"} ${error ? "border-red-400 bg-red-100" : "border-gray-400 bg-gray-50"} rounded-xl ${className}`}
            placeholder={placeHolder}
          />
          {IconComponent && (
            <IconComponent
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          )}
          {type === "password" && (
            <>
              {type === "password" && (
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? (
                    <Icons.EyeOff
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${error ? "text-red-500" : "text-gray-400"} `}
                      size={20}
                    />

                  ) : (
                    <Icons.EyeIcon
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${error ? "text-red-500" : "text-gray-400"} `}
                      size={20}
                    />
                  )}
                </button>
              )}
            </>
          )}
          {customTag && (
            <div className="absolute top-1 left-2 mt-1 w-full sm:w-auto">
              <div className="relative h-full">
                <select
                  ref={selectRef}
                  name="salutation"
                  className="appearance-none py-1 pl-3.5 pr-7 text-sm text-neutral-500 font-medium w-full h-full bg-light outline-none cursor-pointer rounded-full border bg-gray-200 shadow-sm border-gray-300"
                >
                  {customTag.options.map((option: any) => {
                    return (
                      <option value={option}>{option}</option>
                    )
                  })}
                </select>
              </div>
              <button className='absolute top-1/2 right-1 transform -translate-y-1/2'
                onClick={handleChevronClick}
              >
                <ChevronDown
                  className=" text-gray-400" size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputField;
