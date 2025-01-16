import { InfoLabel } from '@/lib/helper';
import { CircleUserRound } from 'lucide-react';
import React from 'react'

const ResourceRequestCard = (props: any) => {
    const { resource } = props;
    return (
        <div className='relative bg-gray-300 rounded-3xl flex flex-col gap-4 flex-1 p-6 w-full z-10'>
            <CircleUserRound className='absolute right-0 top-0 h-16 w-16 m-4 text-gray-400' />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <InfoLabel label="Resource Role Name" content={resource?.name} />
                <InfoLabel label="Resource Role Required" content={resource?.role_required} />
                <InfoLabel label="Start Date" content={resource?.start_date || "N/A"} />
                <InfoLabel label="Daily hours required" content={resource?.daily_hours_required.split(".")[0] || "N/A"} />
            </div>
        </div >
    )
}

export default ResourceRequestCard
