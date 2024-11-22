"use client"

const InputField = ({
    label,
    id,
    value,
    className = '',
    isRequired,
    error,
    onChange,
}: any) => {
    console.log("error", error);

    return (
        <div className="relative flex flex-col justify-center items-start w-full gap-2">
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
            )}            <input
                value={value}
                id={id}
                type="date"
                className={`h-12 pl-4 pr-4 text-black border ${error ? "border-red-400 bg-red-100" : "border-gray-400 bg-gray-50"} rounded-xl ${className}`}
                onChange={onChange}
            />
        </div>
    );
};

export default InputField;
