import { ArrowRight, ChevronRight, HomeIcon } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Breadcrumb = ({
    type,
}: any) => {
    const pathName = usePathname();
    const breadCrumb = pathName.split('/').filter(Boolean); // Filtering out empty strings
    const [breadCrumbArray, setBreadCrumbArray] = useState<string[]>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const dashboardIndex = breadCrumb.findIndex((item) => item === "dashboard");
        if (dashboardIndex !== -1) {
            setIndex(dashboardIndex + 1);
            setBreadCrumbArray(breadCrumb.slice(dashboardIndex + 1));
        }
    }, [pathName]);

    return (
        <div className='bg-gray-100 py-2 rounded-full px-4'>
            <div className="flex items-center mr-auto">
                <Link className="flex items-center text-sm hover:text-black" href={`/${type}/dashboard`}>
                    <span className="inline-block mr-1">
                        <HomeIcon color='#000' className='h-5' />
                    </span>
                    <span className='text-gray-600'>Dashboard</span>
                </Link>
                {breadCrumbArray.length > 0 && (
                    <>
                        <ChevronRight className='w-4 h-4 mx-2' />
                        {breadCrumbArray.map((crumb, idx) => (
                            <React.Fragment key={idx}>
                                <Link className="flex items-center text-sm hover:text-black" href={`/${type}/dashboard/${crumb}`}>
                                    <span className='text-gray-600 capitalize whitespace-nowrap'>{crumb.split('-').join(' ')}</span>
                                </Link>
                                {idx < breadCrumbArray.length - 1 && (
                                    <ChevronRight className='w-4 h-4 mx-2' />
                                )}
                            </React.Fragment>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default Breadcrumb
