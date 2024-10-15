"use client"
import * as Icons from 'lucide-react';

const InputField = ({
    placeHolder,
    label,
    cols,
    className = ''
}: any) => {
    return (
        <div className="relative flex flex-col justify-center items-start w-full gap-2">
            <label className='text-sm font-bold text-gray-700'>{label}</label>
            <textarea
                rows={4}
                className={`h-auto pl-4 pr-4 py-2 text-black bg-gray-100 border border-gray-400 rounded-xl ${className}`}
                placeholder={placeHolder}
            />
        </div>
    );
};

export default InputField;
