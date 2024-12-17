"use client";
import DetailedView from '@/components/company/detailedView/DetailedView';
import React from 'react'

const page = ({ params }: any) => {
    const projectID = params.project_sfid

    return (
        <div>
            {projectID}
        </div>
    )
}

export default page
