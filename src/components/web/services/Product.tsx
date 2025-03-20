import Image from "next/image";
import React, { forwardRef } from 'react';
import { cn } from "../../../lib/utils";

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode; name: string; textColor: any }
>(({ className, children, name, textColor }, ref) => {

    return (
        <div className='flex flex-col items-center justify-center z-20'>
            <div
                ref={ref}
                className={cn(
                    "z-10 relative flex size-16 opacity-1 uppercase lg:size-20 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,1)]",
                    className,
                )}
            >
                {children}
            </div>
            <div className={`${textColor} text-white px-2 rounded-full mt-2 font-extrabold uppercase text-xs`}>
                {name}
            </div>
        </div>
    );
});

Circle.displayName = "Circle";

const Product = forwardRef<any>(({ imgUrl, imgSize, bgColor, borderColor, textColor,serviceName}: any, ref) => {
    return (
        <>
            <Circle ref={ref} name={serviceName} textColor={textColor} className={`${bgColor} ${borderColor} ${imgSize}`}>
                <img
                    width={800}
                    height={800}
                    alt="Card background"
                    className="mix-blend-multiply"
                    src={imgUrl}
                />{" "}
            </Circle>
        </>
    );
});

Product.displayName = "SalesforceProducts";

export default Product;
