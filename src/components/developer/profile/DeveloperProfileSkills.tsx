import Modal from '@/components/modal/Modal';
import { PencilIcon, Sparkle } from 'lucide-react';
import { useEffect, useState } from 'react';
import Skills from '../onboarding/Skills';
import Tooltip from '@/components/Tooltip';
import DeveloperProfileCardHeader from './DeveloperProfileCardHeader';

const ProfileSkillComponent = ({ name }: any) => {
    const [checkedItem, setCheckedItem] = useState<any>();
    const initialItems = [
        { text: 'Salesforce', imageSrc: '/Salesforce.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
        { text: 'Mulesoft', imageSrc: '/Mulesoft.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
        { text: 'Heroku', imageSrc: '/heroku.png', bgColor: 'bg-purple-100', checkedColor: 'bg-purple-500', borderColor: 'border-purple-600', textColor: 'text-purple-900' },
        { text: 'Sales Cloud', imageSrc: '/sales-cloud.svg', bgColor: 'bg-green-100', checkedColor: 'bg-green-500', borderColor: 'border-green-600', textColor: 'text-green-800' },
        { text: 'Service Cloud', imageSrc: '/service-cloud.svg', bgColor: 'bg-pink-100', checkedColor: 'bg-pink-500', borderColor: 'border-pink-600', textColor: 'text-pink-600' },
        { text: 'Marketing Cloud', imageSrc: '/marketing-cloud.svg', bgColor: 'bg-orange-100', checkedColor: 'bg-orange-500', borderColor: 'border-orange-600', textColor: 'text-orange-400' },
        { text: 'B2B Commerce Cloud', imageSrc: '/commerce-cloud.svg', bgColor: 'bg-green-100', checkedColor: 'bg-green-500', borderColor: 'border-green-600', textColor: 'text-green-800' },
        { text: 'B2C Commerce Cloud', imageSrc: '/commerce-cloud.svg', bgColor: 'bg-green-100', checkedColor: 'bg-green-500', borderColor: 'border-green-600', textColor: 'text-green-800' },
        { text: 'Experience Cloud', imageSrc: '/Salesforce.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
        { text: 'Industry Cloud', imageSrc: '/Salesforce.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
        { text: 'Einstein Copilot', imageSrc: '/encop.webp', bgColor: 'bg-purple-100', checkedColor: 'bg-purple-500', borderColor: 'border-purple-600', textColor: 'text-purple-900' },
        { text: 'AI', imageSrc: '/encop.webp', bgColor: 'bg-purple-100', checkedColor: 'bg-purple-500', borderColor: 'border-purple-600', textColor: 'text-purple-900' },
    ];

    useEffect(() => {
        setCheckedItem(initialItems.find((item: any) => item.text === name))
    }, [])

    if (checkedItem?.bgColor) {
        return (
            <div className={`inline-flex gap-2 items-center min-w-max whitespace-nowrap ${checkedItem.bgColor} border ${checkedItem.borderColor} p-2 pl-4 rounded-full relative z-0`}>
                <img className='w-auto h-5 lg:h-6' src={checkedItem.imageSrc} alt={name} />
                <span className={`font-bold text-xs lg:text-base ${checkedItem.textColor}`}>
                    {name}
                </span>
                <Tooltip popupContent={"Middle"} show={false}>
                    <div className='cursor-pointer bg-white w-6 h-6 lg:w-8 lg:h-8 text-sm lg:text-xl flex items-center justify-center rounded-full'>
                        🏆
                    </div>
                </Tooltip>
            </div>
        );
    }
};

const DeveloperProfileSkills = ({ skills, loading, updateDetails }: any) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!showModal) {
            updateDetails()
        }
    }, [showModal])

    return (
        <>
            <div className='bg-gray-50 rounded-2xl w-full p-4 lg:p-6 flex flex-col gap-6'>
                <DeveloperProfileCardHeader
                    headerIcon={<Sparkle />}
                    headerTitle={"Skills"}
                    headerContent={
                        <div className='flex flex-row gap-4 items-center'>

                            <button
                                onClick={() => setShowModal(true)}
                                className='bg-gray-200 border border-gray-300 flex flex-row items-center justify-center gap-2 rounded-full text-gray-900 py-2 px-4 text-sm font-bold group'
                            >
                                <PencilIcon className="w-4 h-4 cursor-pointer ml-2" />
                                <span className="overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out opacity-0 w-0 group-hover:w-auto group-hover:opacity-100">
                                    Edit
                                </span>
                            </button>
                        </div>
                    }
                />

                <div className='flex flex-col lg:flex-row gap-2 items-center bg-transparent lg:bg-white border-0 lg:border p-1 lg:p-1.5 lg:pl-4 w-full lg:w-fit rounded-xl lg:rounded-full'>
                    <span className='text-xs font-bold text-gray-700 mr-2'>
                        Skill Level
                    </span>
                    <div className='flex flex-row gap-2 items-center'>
                        <div className='flex bg-blue-100 border border-blue-300 rounded-full px-3 flex-row gap-2 items-center'>
                            <span className='text-lg'>
                                📖
                            </span>
                            <span className='text-xs font-bold'>
                                Junior
                            </span>
                        </div>
                        <div className='flex bg-amber-100 border border-amber-300 rounded-full px-3 flex-row gap-2 items-center'>
                            <span className='text-lg'>
                                🏅
                            </span>
                            <span className='text-xs font-bold'>
                                Middle
                            </span>
                        </div>
                        <div className='flex bg-green-100 border border-green-300 rounded-full px-3 flex-row gap-2 items-center'>
                            <span className='text-lg'>
                                🏆
                            </span>
                            <span className='text-xs font-bold'>
                                Expert
                            </span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className='flex flex-row gap-3 w-full flex-nowrap lg:flex-wrap overflow-x-scroll'>
                        <div className='animate-pulse w-1/4 h-10 rounded-full bg-gray-200' />
                        <div className='animate-pulse w-1/4 h-10 rounded-full bg-gray-200' />
                        <div className='animate-pulse w-1/4 h-10 rounded-full bg-gray-200' />
                    </div>
                ) : (
                    <div className='flex flex-row gap-3 w-full flex-wrap overflow-x-scroll'>
                        {skills?.length > 0 ? (
                            <>
                                {skills?.map((item: any, index: any) => (
                                    <ProfileSkillComponent key={index} name={item.skill_name} />
                                ))}
                            </>
                        ) : (
                            <div className='text-center text-black text-sm'>
                                No skills found
                            </div>
                        )
                        }
                    </div>
                )}
            </div>

            {showModal && (
                <Modal
                    header="Edit Skills"
                    setModal={setShowModal}
                    // loading={loadingUI}
                    size="xl"
                    isFooter={false}
                >
                    <div className='min-h-96 bg-[url(/noRecordBG2.png)] -m-6 px-10 bg-no-repeat bg-cover bg-right rounded-xl'>
                        <Skills type="edit" />
                    </div>

                </Modal>)}
        </>

    )
}

export default DeveloperProfileSkills
