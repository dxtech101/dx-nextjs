"use client";
import * as Icons from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input';


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
  onMouseDown,
  disabled,
  checkedItems,
  handleSuggestionSelect,
  salutation ="",
  setSalutation = () => {},
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

  const IconComponent = iconName ? iconMap[iconName] : null;

  return (
    <div className={`relative flex flex-${direction === "row" ? "row items-center" : "col items-start"} justify-center w-full gap-2`}>
      {label && (
        <div className='w-full flex justify-between items-center'>
          <label className='text-sm font-bold text-gray-700 text-nowrap'>
            {label}{isRequired && <span className='text-red-600'>{" "}*</span>}
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
            className={`h-12 pl-4 ${iconName && "pl-[2.5rem]"} ${customTag ? "pl-[4.5rem]" : ""}  pr-4 text-black border ${type === "password" && !showPassword && "text-2xl leading-loose"} ${error ? "border-red-400 bg-red-100" : "border-gray-400 bg-white"} rounded-xl ${className}`}
            placeholder={placeHolder}
            onFocus={onFocus}
            onMouseDown={onMouseDown}
            disabled={disabled}
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
                  onChange={(e) => setSalutation(e.target.value)}
                  value={salutation}
                  className={`p-1 text-sm font-medium max-w-fit h-full bg-light outline-none cursor-pointer rounded-full border 
                    ${error ? "bg-red-200 border-red-300 text-red-500" : "bg-gray-200 border-gray-300 text-neutral-500"} 
                    shadow-sm`}
                >
                  {customTag.options.map((option: any, index: any) => {
                    return (
                      <option key={index} value={option}>{option}</option>
                    )
                  })}
                </select>
              </div>
            </div>
          )}
          {checkedItems && (
            <div className="absolute top-1.5 left-10 mt-1 w-fit sm:w-auto">
              <div className="relative flex flex-row flex-wrap gap-2 mb-2">
                {checkedItems.map((item: any) => (
                  <div
                    key={item?.sfid}
                    className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{item?.name}</span>
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-800"
                      onClick={() => handleSuggestionSelect(item)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputField;
