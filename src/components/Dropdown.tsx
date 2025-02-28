import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DropdownProps {
  id: string;
  label: string;
  className?: string;
  options?: { value: string; label: string }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  isRequired?: boolean;
  error?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  id,
  label,
  className = '',
  options = [],
  defaultValue,
  onChange,
  isRequired = false,
  error
}: DropdownProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownDirection, setDropdownDirection] = useState<'down' | 'up'>('down');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue)
    }
  }, [defaultValue])

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (value: string) => {
    setSelectedValue(value);
    onChange && onChange(value);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Adjust dropdown direction based on space
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < 200 && spaceAbove > spaceBelow) {
        setDropdownDirection('up');
      } else {
        setDropdownDirection('down');
      }
    }
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={`relative ${className} flex flex-col gap-2`}
    >
      <label className="text-sm font-bold text-gray-700">{label}{isRequired && <span className='text-red-600'>{" "}*</span>}</label>
      {error && (
        <span className='text-xs text-red-500 font-bold'>
          {error}
        </span>
      )}
      <div
        id={id}
        className="flex items-center justify-between px-4 py-2 bg-gray-100 border border-gray-400 rounded-xl cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className={selectedValue ? 'text-gray-700' : 'text-gray-500'}>
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : 'Select an option...'}
        </span>
        <button
          type='button'
          className="text-gray-600 focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
        >
          <ChevronUp className={`${isOpen ? `rotate-0` : `rotate-180`} duration-200`} />
        </button>
      </div>

      {isOpen && (
        <div
          className={`absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto ${dropdownDirection === 'up' ? 'bottom-full' : 'top-full mt-1'
            }`}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
