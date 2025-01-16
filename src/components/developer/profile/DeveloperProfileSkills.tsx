import InputField from '@/components/InputField';
import Modal from '@/components/modal/Modal';
import ErrorToast from '@/components/toast/ErrorToast';
import SuccessfulToast from '@/components/toast/SuccessfulToast';
import { skillsDetails } from '@/constants/data';
import { assignSkills, deleteAssignedSkills, getAllAssignedSkills, getAllSalesforceSkills } from '@/lib/service/portfolio.service';
import { PencilIcon, Sparkle, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const SkillItem = ({ name }: any) => {
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
            <div className={`inline-flex gap-2 items-center min-w-max whitespace-nowrap ${checkedItem.bgColor} border ${checkedItem.borderColor} p-2 px-4 rounded-full relative z-10`}>
                <img className='w-auto h-6' src={checkedItem.imageSrc} alt={name} />
                <span className={`font-bold ${checkedItem.textColor}`}>
                    {name}
                </span>
            </div>
        );
    }
};

const CheckboxItem = ({ id, checked, onChange }: any) => {
    const [checkedItem, setCheckedItem] = useState<any>();

    useEffect(() => {
        setCheckedItem(skillsDetails.find((item: any) => item.id === id))
    }, [])

    if (checkedItem?.bgColor) {
        return (
            <div className={`inline-flex gap-2 items-center ${checkedItem.bgColor} border ${checkedItem.borderColor} p-2 pl-4 rounded-full relative z-10 whitespace-nowrap min-w-max`}>
                <img className='w-auto h-6' src={checkedItem.imageSrc} alt={checkedItem.text} />
                <span className={`font-normal ${checkedItem.textColor}`}>
                    {checkedItem.text}
                </span>
                <input
                    type="checkbox"
                    className={`w-6 h-6 ${checkedItem.textColor} bg-gray-100 border-2 ${checkedItem.borderColor} rounded-xl appearance-none `}
                    checked={checked}
                    onChange={onChange}
                />
                {checked && (
                    <button
                        className={`absolute top-2.5 right-2.5 w-5 h-5 flex items-center justify-center ${checkedItem.checkedColor} rounded-full cursor-pointer`}
                        onClick={onChange}
                    >
                        <X className="w-4 h-4" strokeWidth={2} color='white' />
                    </button>
                )}
            </div>
        );
    }

};

const DeveloperProfileSkills = ({ skills, loading, updateDetails }: any) => {
    const [showModal, setShowModal] = useState(false);
    const [initialItems, setInitialItems] = useState<any[]>([]);
    const [initialCheckedItems, setInitialCheckedItems] = useState<any[]>([]);
    const [items, setItems] = useState<any[]>([]);
    const [checkedItems, setCheckedItems] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loadingUI, setLoadingUI] = useState(false);
    const containerRef: any = useRef(null);
    const contactSfid = useSelector((state: any) => state.userSalesforceID)

    const dispatch = useDispatch();

    const getSkillsDetails = async () => {
        try {
            setLoadingUI(true);
            const { results: allSkills } = await getAllSalesforceSkills();
            const { results: assignedSkills } = await getAllAssignedSkills(contactSfid);
            const assignedSkillsIds = assignedSkills.map((skill: any) => skill.skill);
            console.log("assignedSkillsIds::", assignedSkillsIds)
            console.log("allSkills::", allSkills)
            console.log("assignedSkills::", allSkills.filter((item: any) => assignedSkillsIds.includes(item.sfid)))

            setInitialItems(allSkills)
            setInitialCheckedItems(assignedSkills)
            setItems(allSkills.filter((item: any) => !assignedSkillsIds.includes(item.sfid)));
            setCheckedItems(allSkills.filter((item: any) => assignedSkillsIds.includes(item.sfid)));
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoadingUI(false);
        }
    }

    useEffect(() => {
        getSkillsDetails();

        const handleClickOutside = (event: any) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    const addSkills = async (id: any) => {
        const body: any = {
            "contact_sfid": contactSfid,
            "skill_sfids": [id]
        }
        try {
            setLoadingUI(true)
            const response = await assignSkills(body);
            if (response) {
                toast.custom((t) => (
                    <SuccessfulToast t={t} message={"Salesforce Skill added Successfully"} />
                ));
            }
        } catch (error: any) {
            toast.custom((t) => (
                <ErrorToast t={t} message={error?.response?.data?.error} />
            ))
        }
        finally {
            setLoadingUI(false)
        }
    }

    const deleteSkills = async (sfid: string) => {
        try {
            setLoadingUI(true)
            const id = initialCheckedItems.find((item: any) => item.skill === sfid)?.sfid;
            const response = await deleteAssignedSkills(id);
            if (response) {
                toast.custom((t) => (
                    <SuccessfulToast t={t} message={"Salesforce Skill Deleted Successfully"} />
                ));
            }
        } catch (error: any) {
            toast.custom((t) => (
                <ErrorToast t={t} message={error?.response?.data?.error} />
            ))
        }
        finally {
            setLoadingUI(false)
        }
    }

    const handleCheckboxChange = (id: any) => {
        const isChecked = checkedItems.find((i: any) => i.sfid === id);
        const item = initialItems.find((i: any) => i.sfid === id);

        if (isChecked) {
            const uncheckedItem = checkedItems.find(i => i.sfid === id);
            if (uncheckedItem) {
                setItems([...items, uncheckedItem]);
                setCheckedItems(checkedItems.filter(i => i.sfid !== id));
                deleteSkills(id)
            }
        } else {
            setCheckedItems([...checkedItems, item]);
            setItems(items.filter((i: any) => i.sfid !== id));
            addSkills(id)
        }
    };

    useEffect(() => {
        if (inputValue.trim()) {
            const filtered = items.filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()));
            setItems(filtered);
            setShowSuggestions(true);
        } else setItems(initialItems)
    }, [inputValue]);

    const handleSuggestionSelect = (item: any) => {
        setInputValue(item.text);
        handleCheckboxChange(item.sfid);
        setShowSuggestions(false);
        setInputValue("")
    }

    useEffect(() => {
        if (!showModal) {
            updateDetails()
        }
    }, [showModal])

    return (
        <>
            <div className='bg-gray-50 rounded-2xl w-full p-4 lg:p-6 flex flex-col gap-6'>
                <div className='flex flex-row justify-between items-center'>
                    <span className='text-2xl font-bold inline-flex items-center gap-2'>
                        <Sparkle /> Skills
                    </span>
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
                {loading ? (
                    <div className='flex flex-row gap-3 w-full flex-nowrap lg:flex-wrap overflow-x-scroll'>
                        <div className='animate-pulse w-1/4 h-10 rounded-full bg-gray-200' />
                        <div className='animate-pulse w-1/4 h-10 rounded-full bg-gray-200' />
                        <div className='animate-pulse w-1/4 h-10 rounded-full bg-gray-200' />
                    </div>
                ) : (
                    <div className='flex flex-row gap-3 w-full flex-nowrap lg:flex-wrap overflow-x-scroll'>
                        {skills?.length > 0 ? (
                            <>
                                {skills?.map((item: any, index: any) => (
                                    <SkillItem key={index} name={item.skill_name} />
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
                    <div className='py-8 z-10'>
                        <h2 className='text-sm uppercase font-semibold'>Search Skills</h2>
                        <div ref={containerRef} className='relative mt-4'>
                            {loadingUI ?
                                <div className='animate-pulse w-full lg:w-1/2 h-12 rounded-xl bg-gray-200' /> :
                                <InputField
                                    className='w-full lg:w-1/2'
                                    iconName='search'
                                    placeHolder='Search your skills (Ex. Salesforce, Mulesoft, Heroku)'
                                    value={inputValue}
                                    onChange={(e: any) => setInputValue(e.target.value)}
                                    onFocus={() => setShowSuggestions(true)}
                                />
                            }

                            {showSuggestions && (
                                <div className='absolute bg-white border-2 left-0 border-gray-200 rounded-xl shadow-sm w-full lg:w-1/2 mt-1 max-h-48 overflow-y-auto z-20'>
                                    {items.length > 0 ? (
                                        items.map((item) => (
                                            <div
                                                key={item.sfid}
                                                className='flex items-center gap-2 p-3 border border-b-0 cursor-pointer hover:bg-gray-100'
                                                onMouseDown={() => handleSuggestionSelect(item)}
                                            >
                                                {/* <img className='w-8 h-auto' src={'/' + item.name + '.png'} alt={item.name} /> */}
                                                <span className='font-normal text-gray-800 ml-4'>{item.name}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className='text-md text-gray-400 p-4'>No matching skills</div>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>

                    <h2 className='text-sm uppercase font-semibold z-10'>Selected Skills</h2>
                    <div className='pt-4 flex flex-row gap-4 flex-nowrap lg:flex-wrap z-40 overflow-x-auto w-full appearance-none'>
                        {loadingUI ?
                            <>
                                <div className={`animate-pulse inline-flex w-1/6 h-8 gap-2 items-center bg-gray-200 border p-2 pl-4 pr-4 rounded-full`} />
                                <div className={`animate-pulse inline-flex w-1/6 h-8 gap-2 items-center bg-gray-200 border p-2 pl-4 pr-4 rounded-full`} />
                            </>
                            :
                            <>
                                {checkedItems.length > 0 ? checkedItems.map(item => (
                                    <CheckboxItem
                                        key={item.sfid}
                                        id={item.sfid}
                                        checked={checkedItems.some(checkedItem => checkedItem.sfid === item.sfid)}
                                        onChange={() => handleCheckboxChange(item.sfid)}
                                    />
                                )) : (
                                    <span className="text-md font-normal text-gray-400 ml-2 z-10">
                                        No Skills Selected...
                                    </span>
                                )}
                            </>
                        }
                    </div>
                </Modal>)}
        </>

    )
}

export default DeveloperProfileSkills
