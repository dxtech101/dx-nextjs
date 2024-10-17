"use client";
import * as Icons from 'lucide-react';

const InputField = ({
  placeHolder,
  iconName,
  label,
  direction,
  isRequired,
  error,
  className = '',
  customTag = false, // default false
  value,
  onChange,
  id
}: any) => {
  const iconMap: any = {
    search: Icons.Search,
    clear: Icons.X,
    user: Icons.User,
  };

  const IconComponent = iconName ? iconMap[iconName] : null;

  return (
    <div className={`relative flex flex-${direction === "row" ? "row items-center" : "col items-start"} justify-center w-full gap-2`}>
      {label && (
        <div className='w-full flex justify-between items-center'>
          <label className='text-sm font-bold text-gray-700 text-nowrap'>
            {label}{isRequired && <>*</>}
          </label>
          {error && (
            <span className='text-xs text-red-500 font-bold'>
              This field is required
            </span>
          )}
        </div>
      )}

      <div className="flex flex-wrap sm:flex-nowrap w-full">
        {customTag && (
          <div className="w-full sm:w-auto">
            {/* <div className="relative h-full">
              <select
                name="salutation"
                className="appearance-none py-2 pl-3.5 pr-10 text-sm text-neutral-500 font-medium w-full h-full bg-light outline-none cursor-pointer rounded-tl-lg rounded-bl-lg border border-gray-300"
                value={value}
                onChange={onChange}
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
              </select>
            </div> */}
          </div>
        )}

        <div className={`relative w-full ${customTag ? 'sm:flex-1' : ''}`}>
          <input
            type="text"
            value={value}
            id={id}
            onChange={onChange}
            className={`h-12 ${iconName && "pl-10"} pl-4 pr-4 text-black border ${error ? "border-red-400 bg-red-100" : "border-gray-400 bg-gray-100"} rounded-xl ${className}`}
            placeholder={placeHolder}
          />
          {IconComponent && (
            <IconComponent
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InputField;
