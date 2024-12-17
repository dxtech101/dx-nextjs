"use client"
import * as Icons from 'lucide-react';

const InputArea = ({
    id,
    placeHolder,
    label,
    cols,
    value,
    onChange,
    maxLength,
    className = ''
}: any) => {

    const isMaxLengthReached = value?.length >= maxLength;

    const handleChange = (e: any) => {
        if (e.target.value.length <= maxLength) {
            onChange(e);
        }
    };
    return (
        <div className="relative flex flex-col justify-center items-start w-full gap-2">
            <div className='w-full flex justify-between items-center'>
                <label className='text-sm font-bold text-gray-700'>
                    {label}
                </label>
                {maxLength &&
                    <label className={`text-sm font-bold text-gray-700 ${isMaxLengthReached && "text-red-500"}`}>
                        {value.length} / {maxLength} characters
                    </label>
                }
            </div>

            <textarea
                id={id}
                rows={4}
                className={`h-auto pl-4 pr-4 py-2 text-black bg-gray-100 border border-gray-400 rounded-xl ${className}`}
                placeholder={placeHolder}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default InputArea;
