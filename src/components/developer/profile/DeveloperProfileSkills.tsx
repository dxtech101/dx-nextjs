import Modal from '@/components/modal/Modal';
import { PencilIcon, Sparkle } from 'lucide-react';
import { useEffect, useState } from 'react';
import Skills from '../onboarding/Skills';
import DeveloperProfileCardHeader from './DeveloperProfileCardHeader';
import { skillsDetails } from '@/constants/data';

const ProfileSkillComponent = ({ name, skill_level, url }: any) => {
    const [checkedItem, setCheckedItem] = useState<any>();

    useEffect(() => {
        setCheckedItem(skillsDetails.find((item: any) => item.text === name))
    }, [])

    if (checkedItem?.bgColor) {
        return (
            <div className={`inline-flex gap-2 items-center min-w-max whitespace-nowrap ${checkedItem.bgColor} border ${checkedItem.borderColor} p-2 pl-4 rounded-full relative z-0`}>
                <img className='w-auto h-5 lg:h-6 mix-blend-multiply' src={url} alt={name} />
                <span className={`font-bold text-xs lg:text-base ${checkedItem.textColor}`}>
                    {name}
                </span>
                <div className='cursor-pointer bg-white w-6 h-6 lg:w-8 lg:h-8 text-sm lg:text-xl flex items-center justify-center rounded-full'>
                    {skill_level === "Junior" ? "📖" : skill_level === "Middle" ? "🏅" : "🏆"}
                </div>
            </div>
        );
    }
};

const DeveloperProfileSkills = ({ skills, loading, updateDetails }: any) => {
    const [showModal, setShowModal] = useState(false);

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
                                    <ProfileSkillComponent
                                        key={index}
                                        name={item.skill_name}
                                        skill_level={item.skill_level}
                                        url={item.url}
                                    />
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
                    onClose={() => updateDetails()}
                >
                    <div className='min-h-96 bg-[url(/noRecordBG2.png)] -m-6 px-10 bg-no-repeat bg-cover bg-right rounded-xl'>
                        <Skills type="edit" />
                    </div>

                </Modal>)}
        </>

    )
}

export default DeveloperProfileSkills
