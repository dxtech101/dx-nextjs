"use client"
import * as Icons from 'lucide-react';

const InputField = ({
  placeHolder,
  iconName,
  label,
  direction,
  isRequired,
  error,
  className = ''
}: any) => {
  const iconMap: any = {
    search: Icons.Search,
    clear: Icons.X,
    user: Icons.User,
  };

  const IconComponent = iconName ? iconMap[iconName] : null;

  return (
    <div className={`relative flex flex-${direction === "row" ? "row items-center" : "col items-start"} justify-center w-full gap-2`}>
      <div className='w-full flex justify-between items-center'>
        <label className='text-sm font-bold text-gray-700 text-nowrap'>{label}{isRequired && <>*</>}</label>
        {error && (
          <span className='text-xs text-red-500 font-bold'>
            This field is required
          </span>
        )}
      </div>
      <input
        type="text"
        className={`h-12 ${IconComponent && "pl-12"} pl-4 pr-4 text-black  border ${error ? "border-red-400 bg-red-100" : "border-gray-400 bg-gray-100"} rounded-xl ${className}`}
        placeholder={placeHolder}
      />
      {IconComponent && (
        <IconComponent
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      )}
    </div>
  );
};

export default InputField;
