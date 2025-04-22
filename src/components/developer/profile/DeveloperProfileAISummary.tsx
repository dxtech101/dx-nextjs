"use client"
import { getExperienceSummary } from '@/lib/service/portfolio.service'
import cn from "clsx"
import { motion } from 'framer-motion'
import { BrainCircuit, ScanLine } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DeveloperProfileCardHeader from './DeveloperProfileCardHeader'

const Sparkles = () => {
    const randomMove = () => Math.random() * 2 - 1;
    const randomOpacity = () => Math.random();
    const random = () => Math.random();
    return (
        <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
                <motion.span
                    key={`star-${i}`}
                    animate={{
                        top: `calc(${random() * 100}% + ${randomMove()}px)`,
                        left: `calc(${random() * 100}% + ${randomMove()}px)`,
                        opacity: randomOpacity(),
                        scale: [1, 1.2, 0],
                    }}
                    transition={{
                        duration: random() * 2 + 4,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        position: "absolute",
                        top: `${random() * 100}%`,
                        left: `${random() * 100}%`,
                        width: `3px`,
                        height: `3px`,
                        borderRadius: "50%",
                        zIndex: 1,
                    }}
                    className="inline-block bg-black"
                ></motion.span>
            ))}
        </div>
    );
};


const Skeleton = () => {
    return (
        <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
            <div className="flex flex-row text-blue-300 text-2xl lg:text-6xl font-bold flex-shrink-0 justify-center items-center gap-2">
                Generating AI Summary
            </div>
            <div className="h-40 w-px absolute top-10 lg:top-20 m-auto z-40 bg-gradient-to-b from-transparent via-gray-800 to-transparent animate-move">
                <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
                    <Sparkles />
                </div>
            </div>
        </div>
    );
};

export const CardSkeletonContainer = ({
    className,
    children,
    showGradient = true,
}: {
    className?: string;
    children: React.ReactNode;
    showGradient?: boolean;
}) => {
    return (
        <div
            className={cn(
                "h-[15rem] md:h-[20rem] rounded-xl z-40",
                className,
                showGradient &&
                "bg-neutral-100 [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
            )}
        >
            {children}
        </div>
    );
};

const DeveloperAISummary = () => {
    const [story, setStory] = useState<any>(null)
    const accountId = useSelector((state: any) => state.userSalesforceID)
    const [loading, setLoading] = useState(false)

    const getExperienceSummaryData = async () => {
        try {
            setLoading(true)
            const { story } = await getExperienceSummary(accountId);
            setStory(story)
        } catch (error) {
            console.error("Error fetching experience summary:", error);
        } finally {
            setLoading(false)
        }
    }

    const formatBoldText = (text: any) => {
        return text?.split(/(\*\*.*?\*\*)/g).map((part: any, index: any) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong className='text-lg' key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    useEffect(() => {
        getExperienceSummaryData()
    }, [accountId])

    return (
        <div className='bg-blue-50 border relative border-blue-200 rounded-2xl w-full p-4 lg:p-6 flex flex-col gap-6'>
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
            {!loading ?
                <CardSkeletonContainer>
                    <Skeleton />
                </CardSkeletonContainer> :
                <div className='flex flex-col gap-2 items-start'>
                    <div style={{ whiteSpace: "pre-wrap" }} className='text-sm text-gray-800' >
                        {formatBoldText(story)}
                    </div>
                </div>
            }
        </div>
    )
}

export default DeveloperAISummary
