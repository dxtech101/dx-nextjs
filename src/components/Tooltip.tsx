import React, { ReactNode } from 'react';

interface TooltipProps {
    children: ReactNode;
    popupContent: string;
    color?: string;
    show: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ children, popupContent, color = 'transparent', show }) => {
    return (
        <div className="relative group z-50">
            {/* Tooltip Popup */}
            <div
                className={`${!show && "group-hover:flex"} hidden items-center justify-center w-max max-w-xs text-xs font-bold uppercase text-gray-100 bg-slate-900 px-5 py-2 border border-gray-400 shadow-md rounded-xl absolute left-full bottom-1/2 translate-y-1/2 mt-1 ml-2`}
                role="tooltip"
                aria-label={popupContent}
            >
                {popupContent}
                <div className="absolute z-0 -left-[7px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-sm bg-slate-900 border-l border-b border-gray-400 transform rotate-45" />
            </div>

            {children}
        </div>
    );
}

export default Tooltip;
