import React from 'react'

const Button = ({ loading, onClick, children }: any) => {
    console.log("loadiing", loading);
    
    return (
        <button
            disabled={loading}
            onClick={onClick}
            className={`${loading ? "opacity-45" : "opacity-100"}bg-blue-500 text-white font-normal h-12 px-4 rounded-xl whitespace-nowrap`}>
            {children}
        </button>
    )
}

export default Button
