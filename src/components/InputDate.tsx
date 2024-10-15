"use client"

const InputField = ({
    label,
    className = ''
}: any) => {
    return (
        <div className="relative flex flex-col justify-center items-start w-full gap-2">
            <label className='text-sm font-bold text-gray-700'>{label}</label>
            <input
                type="date"
                className={`h-12 pl-4 pr-4 text-black bg-gray-100 border border-gray-400 rounded-xl ${className}`}
            />
        </div>
    );
};

export default InputField;
