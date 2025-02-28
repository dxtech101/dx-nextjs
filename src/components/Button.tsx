import React from 'react'
import clsx from 'clsx'

const Button = ({
    variant,
    loading,
    onClick,
    className,
    label,
}: any) => {

    return (
        <button
            disabled={loading}
            onClick={onClick}
            className={clsx(`bg-blue-500 text-white font-normal h-12 px-4 rounded-xl whitespace-nowrap ${className}`)}
        >
            {loading ? "Loading..." : label}
        </button>
    )
}

export default Button
