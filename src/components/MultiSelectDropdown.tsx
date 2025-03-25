import { ChevronDown, ChevronUp, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface DropdownProps {
    id: string;
    direction?: 'row' | 'col';
    label: string;
    className?: string;
    options?: { value: string; label: string }[];
    onChange?: (value: string) => void;
    defaultValues?: string;
}

const MultiSelectDropdown: React.FC<DropdownProps> = ({
    direction,
    label,
    className = '',
    options,
    onChange,
    defaultValues,
}: any) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dropdownDirection, setDropdownDirection] = useState<'down' | 'up'>('down');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (defaultValues) {
            console.log("defaultValues::", defaultValues);
            setSelectedValues(defaultValues)
        }
    }, [defaultValues])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        // Adding the event listener when the component mounts
        document.addEventListener('click', handleClickOutside);

        // Cleaning up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const handleSelectionChange = (value: string) => {
        setSelectedValues(prev => {
            const updatedValues = prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value];

            onChange && onChange(updatedValues);
            return updatedValues;
        });
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const removeTag = (value: string) => {
        setSelectedValues(prev => prev.filter(v => v !== value));
    };

    useEffect(() => {
        if (isOpen && dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const spaceBelow = windowHeight - rect.bottom;
            const spaceAbove = rect.top;

            if (spaceBelow < 300 && spaceAbove > spaceBelow) {
                setDropdownDirection('up');
            } else {
                setDropdownDirection('down');
            }
        }
    }, [isOpen]);

    return (
        <div
            ref={dropdownRef}
            className={`relative flex flex-${direction === 'row' ? 'row items-center' : 'col items-start'} justify-center w-full gap-2`}
        >
            <label className="text-sm font-bold text-gray-700 text-nowrap">{label}</label>
            <div className="relative w-full">
                <div
                    className={`flex items-center gap-2 h-fit py-2 w-full pl-4 pr-10 bg-white border border-gray-400 rounded-xl flex-wrap whitespace-nowrap ${className}`}
                    onClick={toggleDropdown}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {selectedValues.length > 0 ? (
                        selectedValues.map(value => (
                            <div
                                key={value}
                                className="flex items-center bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full "
                            >
                                <span>{options.find((opt: any) => opt.value === value)?.label}</span>
                                <button
                                    className="ml-2 text-white font-bold bg-red-500 rounded-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeTag(value);
                                    }}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <span className="text-gray-500 text-sm py-1">Select options...</span>
                    )}

                    <button
                        type='button'
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none px-4"
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
                        className={`absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto ${dropdownDirection === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'
                            }`}
                    >
                        {options.map((option: any) => (
                            <div key={option.value} className="hover:bg-gray-100 flex items-center px-4 py-2">
                                <input
                                    id={`checkbox-${option.value}`}
                                    type="checkbox"
                                    checked={selectedValues.includes(option.value)}
                                    onChange={() => handleSelectionChange(option.value)}
                                    className="mr-2"
                                />
                                <label
                                    htmlFor={`checkbox-${option.value}`}
                                    className="text-gray-700 w-full"
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MultiSelectDropdown;
