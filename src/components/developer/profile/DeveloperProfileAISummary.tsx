import { BrainCircuit, PencilIcon, ScanLine, ShieldCheck } from 'lucide-react'
import React from 'react'
import DeveloperProfileCardHeader from './DeveloperProfileCardHeader'

const DeveloperAISummary = () => {
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
                <p className='text-base text-gray-800'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, vel commodi. Earum itaque voluptates hic quasi eligendi, dicta, est blanditiis adipisci, iure eum illo delectus libero impedit perspiciatis facere minima aliquid dignissimos doloremque aliquam officia nostrum sunt nesciunt facilis quod. Delectus, blanditiis corrupti! Inventore cupiditate placeat similique, commodi adipisci earum quod suscipit perferendis ut, ipsa labore rerum molestiae sed quae laboriosam voluptatibus, dolor harum repellat natus id praesentium vero eos aut. Nulla, eos aliquid consequuntur reiciendis dolor fuga tenetur sint qui, enim placeat omnis voluptatibus architecto quis facilis libero, facere itaque culpa? Quibusdam error in facilis numquam saepe vitae repellat.</p>
            </div>
        </div>
    )
}

export default DeveloperAISummary
