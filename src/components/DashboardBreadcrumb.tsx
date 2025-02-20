import { getProject } from '@/lib/service/projectResource.service';
import { ChevronRight, HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const fetchEntityName = async (routeType: string, id: string, setLoading: any) => {
    try {
        setLoading(true);
        let name;
        if (routeType === "projects") {
            const { results: project } = await getProject(id);
            name = project.project_name;
        }
        return name;
    } catch (error) {
        console.error(`Error fetching ${routeType} name:`, error);
        return id;
    } finally {
        setLoading(false);
    }
};

const DashboardBreadcrumb = ({ type }: { type: string }) => {
    const pathName = usePathname();
    const breadCrumb = pathName.split('/').filter(Boolean);
    const [breadCrumbArray, setBreadCrumbArray] = useState<any>([]);
    const [entityNames, setEntityNames] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const dashboardIndex = breadCrumb.findIndex((item) => item === 'dashboard');
        if (dashboardIndex !== -1) {
            setIndex(dashboardIndex + 1);
            setBreadCrumbArray(breadCrumb.slice(dashboardIndex + 1));
        }
    }, [pathName]);

    useEffect(() => {
        const fetchNames = async () => {
            const updatedNames: Record<string, string> = {};

            for (const [index, crumb] of breadCrumbArray.entries()) {
                if (/^[a-zA-Z0-9]{10,}$/.test(crumb)) {
                    const routeType = (breadCrumbArray[index - 1])
                    const name = await fetchEntityName(routeType, crumb, setLoading);
                    updatedNames[crumb] = name;
                }
            }

            setEntityNames(updatedNames);
        };

        fetchNames();
    }, [breadCrumbArray, type]);

    return (
        <div className='bg-gray-100 py-2 rounded-full px-4'>
            <div className='flex items-center mr-auto'>
                <Link className='flex items-center text-sm hover:text-black' href={`/${type}/dashboard`}>
                    <span className='inline-block mr-1'>
                        <HomeIcon color='#000' className='h-5' />
                    </span>
                    <span className='hidden lg:flex text-gray-600'>Dashboard</span>
                </Link>
                {breadCrumbArray.length > 0 && (
                    <>
                        <ChevronRight className='w-4 h-4 mx-2' />
                        {breadCrumbArray.map((crumb: string, idx: number) => (
                            <React.Fragment key={idx}>
                                <Link className='flex items-center text-sm hover:text-black' href={`/${type}/dashboard/${crumb}`}>
                                    <span className='text-gray-600 capitalize whitespace-nowrap'>
                                        {loading ? <>
                                            <div className='animate-pulse h-5 bg-gray-300 w-24 rounded-full' />
                                        </> : <>
                                            {entityNames[crumb] || crumb.split('-').join(' ')}
                                        </>}
                                    </span>
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
    );
};

export default DashboardBreadcrumb;
