"use client"
import Modal from '@/components/modal/Modal';
import { BarChart2, BrainCircuit, Code2, Database, LayoutDashboard, PencilIcon, Server, Share2, Sparkle, Users2, Workflow } from 'lucide-react';
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
            <div className={`inline-flex gap-2 items-center min-w-max whitespace-nowrap ${checkedItem.bgColor} border ${checkedItem.borderColor} p-1 pl-4 rounded-full relative z-0`}>
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

interface Props {
    id: string
}

const categoryIcons: { [key: string]: JSX.Element } = {
    Salesforce: <LayoutDashboard className='w-10 h-10 text-black opacity-10 absolute right-2 top-2' />,
    Integration: <Share2 className='w-10 h-10 text-black opacity-10 absolute right-2 top-2' />,
    Heroku: <Server className='w-10 h-10 text-black opacity-10 absolute right-2 top-2' />,
    Frontend: <Code2 className='w-10 h-10 text-black opacity-10 absolute right-2 top-2' />,
    Backend: <Code2 className='w-10 h-10 text-black opacity-10 absolute right-2 top-2' />,
    Database: <Database className='w-10 h-10 text-black opacity-10 absolute right-2 top-2' />,
    Collaboration: <Users2 className='w-10 h-10 text-black opacity-10 absolute right-2 top-2' />,
    Analytics: <BarChart2 className='w-10 h-10 text-black opacity-10 absolute right-2 top-2' />,
    AI: <BrainCircuit className='w-10 h-10 text-black opacity-10 absolute right-2 top-2' />,
    Others: <Workflow className='w-10 h-10 text-black opacity-10 absolute right-2 top-2' />,
};

const categorizedSkillsMap: { [key: string]: string[] } = {
    Salesforce: ['Salesforce', 'Marketing Cloud', 'Industry Cloud', 'B2B Commerce Cloud', 'Einstein Copilot', 'Experience Cloud', 'B2C Commerce Cloud', 'Service Cloud', 'Sales Cloud'],
    Integration: ['Mulesoft', 'Apache Kafka', 'AWS Step Functions', 'Google Cloud Pub/Sub'],
    Heroku: ['Heroku'],
    Frontend: ['React.js', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Bootstrap', 'Angular'],
    Backend: ['Node.js', 'Express.js', 'Spring Boot', 'Django', 'Flask', 'ASP.NET Core', 'Ruby on Rails'],
    Database: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'DynamoDB'],
    Collaboration: ['Jira', 'Confluence', 'Lucidchart'],
    Analytics: ['Tableau', 'Google Analytics', 'Microsoft Power BI', 'Excel'],
    AI: ['AI'],
}

const categorizeSkills = (skills: any[]) => {
    const categorized: { [key: string]: any[] } = {}

    // Initialize categories
    for (const category in categorizedSkillsMap) {
        categorized[category] = []
    }

    // Distribute skills into categories
    skills.forEach(skill => {
        let found = false
        for (const category in categorizedSkillsMap) {
            if (categorizedSkillsMap[category].includes(skill.skill_name)) {
                categorized[category].push(skill)
                found = true
                break
            }
        }

        // If skill doesn't match any category, assign it to "Others"
        if (!found) {
            if (!categorized['Others']) categorized['Others'] = []
            categorized['Others'].push(skill)
        }
    })

    return categorized
}


const DeveloperProfileSkills = ({ skills, loading, updateDetails, editable = true }: any) => {
    const [showModal, setShowModal] = useState(false);

    const categorized = categorizeSkills(skills)


    return (
        <>
            <div className='bg-gray-50 rounded-2xl w-full p-4 lg:p-6 flex flex-col gap-6'>
                <DeveloperProfileCardHeader
                    headerIcon={<Sparkle />}
                    headerTitle={"Skills"}
                    headerContent={
                        <div className='flex flex-row gap-4 items-center'>
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
                            {editable && (
                                <button
                                    onClick={() => setShowModal(true)}
                                    className='bg-gray-200 border border-gray-300 flex flex-row items-center justify-center gap-2 rounded-full text-gray-900 py-2 px-4 text-sm font-bold group'
                                >
                                    <PencilIcon className="w-4 h-4 cursor-pointer ml-2" />
                                    <span className="overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out opacity-0 w-0 group-hover:w-auto group-hover:opacity-100">
                                        Edit
                                    </span>
                                </button>
                            )}
                        </div>
                    }
                />

                {loading ? (
                    <div className='flex flex-row gap-3 w-full flex-nowrap lg:flex-wrap overflow-x-scroll'>
                        <div className='animate-pulse w-1/4 h-10 rounded-full bg-gray-200' />
                        <div className='animate-pulse w-1/4 h-10 rounded-full bg-gray-200' />
                        <div className='animate-pulse w-1/4 h-10 rounded-full bg-gray-200' />
                    </div>
                ) : (
                    <div className='flex w-full flex-wrap overflow-x-scroll'>
                        {skills?.length > 0 ? (
                            <>
                                {Object.keys(categorized).map((category) =>
                                    categorized[category].length > 0 ? (
                                        <div key={category} className="mb-6 border bg-white px-5 rounded-xl p-4 w-full flex flex-col gap-3 relative">
                                            {categoryIcons[category] || categoryIcons["Others"]}
                                            <h3 className="text-sm font-extrabold text-gray-700 uppercase">{category}</h3>
                                            <div className="flex flex-row gap-3 flex-wrap">
                                                {categorized[category].map((item: any, index: number) => (
                                                    <ProfileSkillComponent
                                                        key={index}
                                                        name={item.skill_name}
                                                        skill_level={item.skill_level}
                                                        url={item.url}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ) : null
                                )}
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
