import { BrainCircuit, PencilIcon, ScanLine, ShieldCheck } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import DeveloperProfileCardHeader from './DeveloperProfileCardHeader'
import { useSelector } from 'react-redux'
import { getExperienceSummary } from '@/lib/service/portfolio.service'

const DeveloperAISummary = () => {
    const [story, setStory] = useState<any>(null)
    const accountId = useSelector((state: any) => state.userSalesforceID)

    const getExperienceSummaryData = async () => {
        try {
            const { story } = await getExperienceSummary(accountId);
            setStory(story)
        } catch (error) {
            console.error("Error fetching experience summary:", error);
        }
    }

    console.log(story)


    useEffect(() => {
        getExperienceSummaryData()
    }, [accountId])

    return (
        <div className='bg-blue-50 border border-blue-200 rounded-2xl w-full p-4 lg:p-6 flex flex-col gap-6'>
            <DeveloperProfileCardHeader
                headerIcon={<ScanLine />}
                headerTitle={"Experience Summary"}
                headerContent={
                    <div className='bg-blue-200 relative px-3 shadow-sm py-2 items-center justify-center flex gap-2 rounded-full text-blue-600'>
                        <BrainCircuit className='w-4 h-4' />
                        <span className='text-xs font-semibold'>
                            AI Generated
                        </span>
                    </div>
                }
            />

            <div className='flex flex-col gap-2 items-start'>
                <div style={{ whiteSpace: "pre-wrap" }} className='text-sm text-gray-800' >
                    {story}
                </div>
            </div>
        </div>
    )
}

export default DeveloperAISummary
