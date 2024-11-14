"use client";
import * as Icons from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import en from 'react-phone-number-input/locale/en'


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
  id,
  onFocus,
  onMouseDown
}: any) => {
  const iconMap: any = {
    search: Icons.Search,
    clear: Icons.X,
    user: Icons.User,
    currency: Icons.DollarSign,
  };
  const selectRef = useRef<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState('US')

  const handleChevronClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  useEffect(() => {
    console.log("selectRef", selectRef.current?.focus());
  }, [selectRef.current])

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
            className={`h-12 pl-4 ${iconName && "pl-[2.5rem]"} ${customTag || type === "tel" && "pl-[5rem]"} pr-4 text-black border ${type === "password" && !showPassword && "text-2xl leading-loose"} ${error ? "border-red-400 bg-red-100" : "border-gray-400 bg-gray-50"} rounded-xl ${className}`}
            placeholder={placeHolder}
            onFocus={onFocus}
            onMouseDown={onMouseDown}
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
            <div className="absolute top-1.5 left-2 mt-1 w-fit sm:w-auto">
              <div className="relative h-full">
                <select
                  ref={selectRef}
                  name="salutation"
                  className={`p-1 text-sm font-medium max-w-fit h-full bg-light outline-none cursor-pointer rounded-full border 
                    ${error ? "bg-red-200 border-red-300 text-red-500" : "bg-gray-200 border-gray-300 text-neutral-500"} 
                    shadow-sm`}
                >
                  {customTag.options.map((option: any) => {
                    return (
                      <option value={option}>{option}</option>
                    )
                  })}
                </select>
              </div>
            </div>
          )}
          {type === "tel" && (
            <div className="absolute top-1.5 left-2 mt-1 w-fit sm:w-auto">
              <div className="relative h-full">
                <select
                  value={country}
                  onChange={event => setCountry(event.target.value)}
                  className={`p-1 text-sm font-medium max-w-fit h-full bg-light outline-none cursor-pointer rounded-full border 
                  ${error ? "bg-red-200 border-red-300 text-red-500" : "bg-gray-200 border-gray-300 text-neutral-500"} 
                  shadow-sm`}
                >
                  {getCountries().map((country) => (
                    <option key={country} value={country}>
                      +{getCountryCallingCode(country)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputField;
