"use client"
import InputField from '@/components/InputField';
import { filterbySkills, skill_level, skillsDetails } from '@/constants/data';
import { onBoardingHandleNext, onBoardingHandlePrevious } from '@/feature/reducers/userOnboarding';
import { getAllSalesforceSkills, SkillsService } from '@/lib/service/portfolio.service';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CheckboxItem = ({ id, checked, onChange, loadingUI, skill_level, imageSrc, name }: any) => {
    const [checkedItem, setCheckedItem] = useState<any>();

    useEffect(() => {
        setCheckedItem(skillsDetails.find((item: any) => item.id === id))
    }, [])

    if (checkedItem?.bgColor) {
        return (
            <div className={`${checkedItem.bgColor} border ${checkedItem.borderColor} p-2 pl-4 rounded-xl relative z-10 whitespace-nowrap min-w-max`}>
                <div className='inline-flex gap-2 items-center'>
                    <img className='w-auto h-6 mix-blend-multiply' src={imageSrc} alt={checkedItem.text} />
                    <span className={`font-normal ${checkedItem.textColor}`}>
                        {name}
                    </span>
                    <input
                        type="checkbox"
                        className={`w-6 h-6 ${checkedItem.textColor} bg-gray-100 border-2 ${checkedItem.borderColor} rounded-xl appearance-none `}
                        checked={checked}
                        disabled={loadingUI}
                        onChange={onChange}
                    />
                    {checked && (
                        <button
                            className={`absolute top-2.5 right-2.5 w-5 h-5 flex items-center justify-center ${checkedItem.checkedColor} rounded-full cursor-pointer`}
                            onClick={onChange}
                            disabled={loadingUI}
                        >
                            <X className="w-4 h-4" strokeWidth={2} color='white' />
                        </button>
                    )}
                </div>

                <div className='text-xs text-black normal-case'>
                    Skill Level: {skill_level}
                </div>
            </div>
        );
    }

};

const Skills = ({ type = "add" }: any) => {

    const [initialItems, setInitialItems] = useState<any[]>([]);
    const [initialCheckedItems, setInitialCheckedItems] = useState<any[]>([]);
    const [items, setItems] = useState<any[]>([]);
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const [checkedItems, setCheckedItems] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingUI, setLoadingUI] = useState(false);
    const containerRef: any = useRef(null);
    const contactSfid = useSelector((state: any) => state.userSalesforceID)
    const [showSkillLevel, setShowSkillLevel] = useState(false);
    const [selectedTags, setSelectedTags] = useState<any>([]);
    const [selectedSkillLevel, setSelectedSkillLevel] = useState("JUNIOR");

    const dispatch = useDispatch();

    const getSkillsDetails = async (reloadType: any) => {
        try {
            if (reloadType === "initial") setLoading(true);
            else if (reloadType === "update") setLoadingUI(true);
            const { results: allSkills } = await getAllSalesforceSkills();
            const { results: assignedSkills } = await SkillsService.getAllAssignedSkills(contactSfid);
            console.log("assignedSkills::", assignedSkills);

            const assignedSkillsIds = assignedSkills.map((skill: any) => skill.skill.sfid);

            setInitialItems(allSkills)
            setInitialCheckedItems(assignedSkills)
            setItems(allSkills.filter((item: any) => !assignedSkillsIds.includes(item.sfid)));
            setFilteredItems(allSkills.filter((item: any) => !assignedSkillsIds.includes(item.sfid)))
            setCheckedItems(assignedSkills);
        } catch (error) {
            console.error("Error fetching cert ====>", error);
        } finally {
            if (reloadType === "initial") setLoading(false);
            else if (reloadType === "update") setLoadingUI(false);
        }
    }

    console.log("checkedItems::", checkedItems);


    useEffect(() => {
        getSkillsDetails("initial");

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

    const handleNext = () => {
        dispatch(onBoardingHandleNext({ role: "developer", stepperId: 2 }))
    }

    const handlePrevious = () => {
        dispatch(onBoardingHandlePrevious({ role: "developer", stepperId: 2 }))
    }

    const addSkills = async (id: any) => {
        console.log(id);

        const body: any = {
            "contact_sfid": contactSfid,
            "skills": {
                [id]: selectedSkillLevel
            }
        }
        try {
            setLoadingUI(true)
            const response = await SkillsService.assignSkills(body);
            if (response) {
                return true;
            }
        } catch (error: any) {
            return false;
        }
        finally {
            setLoadingUI(false)
        }
    }


    const deleteSkills = async (id: string) => {
        try {
            setLoadingUI(true)
            return await SkillsService.deleteAssignedSkills(id);
        } catch (error: any) {
            return false;
        }
        finally {
            setLoadingUI(false)
        }
    }


    const handleCheckboxChange = async (sfid: any, id: any) => {
        const isChecked = checkedItems.find((i: any) => i?.id === id);

        if (isChecked) {
            const uncheckedItem = checkedItems.find((i: any) => i?.id === id);
            if (uncheckedItem) {
                const response = await deleteSkills(id)
                if (response) {
                    getSkillsDetails("update").then(response => {
                        // toast.custom((t) => (
                        //     <SuccessfulToast t={t} message={"Salesforce Skill deleted Successfully"} />
                        // ));
                    })
                } else {
                    // toast.custom((t) => (
                    //     <ErrorToast t={t} message={"Salesforce Skill deleted Failed"} />
                    // ));
                }
            }
        } else {
            const response = await addSkills(sfid)
            if (response) {
                getSkillsDetails("update").then(response => {
                    // toast.custom((t) => (
                    //     <SuccessfulToast t={t} message={"Salesforce Skill added Successfully"} />
                    // ));
                })
            } else {
                // toast.custom((t) => (
                //     <ErrorToast t={t} message={"Salesforce Skill added Failed"} />
                // ));
            }
        }
    };

    useEffect(() => {
        let tempInputValue = inputValue.trim()
        if (tempInputValue) {
            const filtered = items.filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()));
            setFilteredItems(filtered);
        } else setFilteredItems(items)
    }, [inputValue]);


    const filterbyCategory = (category: any) => {
        if (selectedTags.includes(category)) {
            const updatedTags = selectedTags.filter((tag: any) => tag !== category);
            setSelectedTags(updatedTags);
            console.log("updatedTags ==>", updatedTags);

            if (updatedTags.length === 0) {
                setFilteredItems(items);
            } else {
                const filtered = filteredItems.filter(item => updatedTags.includes(item.type));
                setFilteredItems(filtered);
            }
        } else {
            const updatedTags = [...selectedTags, category];
            setSelectedTags(updatedTags);
            const filtered = filteredItems.filter(item => updatedTags.includes(item.type));
            setFilteredItems(filtered);
        }
    };

    const handleSuggestionSelect = (item: any) => {
        setInputValue(item.text);
        handleCheckboxChange(item?.skill?.sfid || item?.sfid, item.id);
        setShowSuggestions(false);
        setInputValue("")
    }

    const handleSkillSelected = (id: any) => {
        setShowSkillLevel(id)
    }


    return (
        <>
            <div className={`${type === "add" && "bg-[url(/noRecordBG2.png)] bg-contain bg-no-repeat bg-bottom bg-white rounded-3xl border border-gray-300 overflow-clip w-full h-full relative px-5 lg:px-10"}`}>
                {type === "add" && (
                    <div className='w-full bg-white top-0 left-0 sticky py-6 flex flex-col gap-6 lg:flex-row justify-between items-start lg:items-center'>
                        <span>
                            <h1 className='text-start text-4xl md:text-5xl font-heading tracking-tight font-medium text-black'>
                                Complete your Profile
                            </h1>
                            <p className='pt-2 tracking-tight text-gray-600 max-w-sm'>
                                Enter the Core skills that you have
                            </p>
                        </span>
                        <div className='flex flex-row gap-4'>
                            <button
                                disabled={loading || loadingUI}
                                onClick={handlePrevious}
                                className={`h-12 px-6 rounded-xl font-normal text-normal bg-gray-200 text-gray-400`}>
                                Previous
                            </button>
                            <button
                                disabled={loading || loadingUI}
                                onClick={handleNext}
                                className={`h-12 px-6 rounded-xl font-medium text-normal bg-blue-500 text-white`}>
                                Save & Next
                            </button>
                        </div>
                    </div>
                )}

                <div className='py-8 z-10'>
                    <h2 className='text-sm uppercase font-semibold'>Search Skills</h2>
                    <div ref={containerRef} className='relative mt-4'>
                        {loading ?
                            <div className='animate-pulse w-full lg:w-1/2 h-12 rounded-xl bg-gray-200' /> :
                            <InputField
                                className='w-full lg:w-1/2'
                                iconName='search'
                                disabled={loadingUI}
                                placeHolder='Search your skills (Ex. Salesforce, Mulesoft, Heroku)'
                                value={inputValue}
                                onChange={(e: any) => setInputValue(e.target.value)}
                                onFocus={() => setShowSuggestions(true)}
                            />
                        }

                        {showSuggestions && !loadingUI && (
                            <div className='absolute bg-white border-2 left-0 rounded-xl shadow-sm w-full lg:w-1/2 mt-1 max-h-48 overflow-y-auto z-20'>
                                <div className='sticky top-0 w-full flex items-center gap-2 bg-white p-2 px-4 whitespace-nowrap'>
                                    <span className='text-sm'>
                                        Filter by:
                                    </span>
                                    <div className='flex overflow-x-scroll no-scrollbar gap-2 items-center'>
                                        {filterbySkills.map((item: any, index: number) => {
                                            return (
                                                <button key={index} onClick={() => filterbyCategory(item)}
                                                    className={`px-2 py-1 rounded-full text-xs ${selectedTags.includes(item) ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                                                >
                                                    {item}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item) => (
                                        <div className={showSkillLevel === item.sfid ? "bg-gray-50" : ""}>
                                            <div
                                                key={item.sfid}
                                                className={`flex flex-row justify-between px-4 items-center gap-2 p-3 border border-b-0 cursor-pointer ${showSkillLevel === item.sfid ? "" : "hover:bg-gray-100"}`}
                                                onMouseDown={() => handleSkillSelected(item.sfid)}
                                            >
                                                {/* <img className='w-8 h-auto' src={'/' + item.name + '.png'} alt={item.name} /> */}
                                                <span className='font-bold text-gray-800'>{item?.name || item?.skill?.name}</span>
                                                <div className='flex flex-row gap-3 items-center'>
                                                    <span className='text-xs'>{item.type}</span>
                                                    {showSkillLevel === item.sfid && (
                                                        <button
                                                            onClick={() => handleSuggestionSelect(item)}
                                                            className='flex bg-green-200 hover:bg-green-600 font-bold text-green-600 hover:text-green-200 duration-200 py-0.5 px-4 rounded-full flex-row text-sm justify-between items-center'>
                                                            Add Skill
                                                        </button>
                                                    )}
                                                </div>

                                            </div>
                                            {showSkillLevel === item.sfid && (
                                                <div className='mx-6 py-2 flex flex-row justify-end gap-4 items-center'>
                                                    <span className='text-xs text-gray-400 '>
                                                        Select Skill Level
                                                    </span>
                                                    <div className='flex flex-row gap-2'>
                                                        {skill_level.map((option: any) => (
                                                            <button
                                                                key={option}
                                                                onClick={() => setSelectedSkillLevel(option)}
                                                                className={`text-xs font-medium px-3 py-1 normal-case rounded-full transition-all duration-300 
                                                        ${selectedSkillLevel === option
                                                                        ? "bg-blue-500 text-white border border-blue-500"
                                                                        : "bg-white text-blue-500 border border-blue-500"} 
                                                         hover:bg-blue-500 hover:text-white`}
                                                            >
                                                                {option}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
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
                <div className='pt-4 flex flex-row gap-4 flex-wrap z-40 overflow-x-auto w-full appearance-none'>
                    {loading ?
                        <>
                            <div className={`animate-pulse inline-flex w-1/6 h-8 gap-2 items-center bg-gray-200 border p-2 pl-4 pr-4 rounded-full`} />
                            <div className={`animate-pulse inline-flex w-1/6 h-8 gap-2 items-center bg-gray-200 border p-2 pl-4 pr-4 rounded-full`} />
                        </>
                        :
                        <>
                            {checkedItems.length > 0 ? checkedItems.map((item, index) => (
                                <CheckboxItem
                                    key={index}
                                    id={item?.skill?.sfid}
                                    name={item?.skill?.name}
                                    checked={checkedItems.some(checkedItem => checkedItem.sfid === item.sfid)}
                                    onChange={() => handleCheckboxChange(item?.skill?.sfid, item?.id)}
                                    skill_level={item.skill_level}
                                    imageSrc={item?.skill?.url}
                                    loadingUI={loadingUI}
                                />
                            )) : (
                                <span className="text-md font-normal text-gray-400 ml-2 z-10">
                                    No Skills Selected...
                                </span>
                            )}
                        </>
                    }
                </div>
            </div>
        </>
    );
};

export default Skills;