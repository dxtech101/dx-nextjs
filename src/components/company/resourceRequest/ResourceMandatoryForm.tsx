import InputField from '@/components/InputField';
import ErrorToast from '@/components/toast/ErrorToast';
import SuccessfulToast from '@/components/toast/SuccessfulToast';
import { filterbyCertificates, skillsDetails } from '@/constants/data';
import { InfoLabel } from '@/lib/helper';
import { getAllSalesforceSkills, getAllSalesforceCertifications } from '@/lib/service/portfolio.service';
import { addCertificationsRequirement, addSkillRequirement, deleteCertificationsRequirement, deleteSkillRequirement, getAllResourceRequest, getCertificationsRequirementByResourceRequest, getSkillRequirementByResourceRequest } from '@/lib/service/projectResource.service';
import { CircleUserRound, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const SkillCheckboxItem = ({ id, checked, onChange }: any) => {
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
                {/* <input
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
                )} */}
            </div>
        );
    }
};

const CertificationCheckboxItem = ({ text, imageSrc, borderColor, textColor, checked, onChange }: any) => {
    console.log("text::", text);

    return (
        <div className={`inline-flex gap-2 items-center bg-white border ${borderColor} p-2 pl-4 pr-4 rounded-full relative z-10 whitespace-nowrap min-w-max`}>
            <img className='w-auto h-16' src={'/' + imageSrc.split(' ').join('-') + '.png'} alt={text} />
            <span className={`font-bold text-sm ${textColor}`}>
                {text.replace(/salesforce/i, '')}
            </span>
            {/* <input
                type="checkbox"
                className={`w-6 h-6 ${textColor} bg-gray-100 border-2 border-blue-500 rounded-xl appearance-none `}
                checked={checked}
                onChange={onChange}
            /> */}
            {/* {checked && (
                <button
                    className={`absolute right-[1.12rem] w-5 h-5 flex items-center justify-center bg-blue-400 rounded-full cursor-pointer`}
                    onClick={onChange}
                >
                    <X className="w-4 h-4" strokeWidth={2} color='white' />
                </button>
            )} */}
        </div>
    );
};

export const ResourceRequestCard = (props: any) => {
    const { resource } = props;
    return (
        <div className='relative bg-gray-200 rounded-3xl flex flex-col gap-4 flex-1 p-6 w-full z-10'>
            <CircleUserRound className='absolute right-0 top-0 h-16 w-16 m-4 text-gray-300' />
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <InfoLabel label="Resource Role Name" content={resource?.name} />
                <InfoLabel label="Resource Role Required" content={resource?.role_required} />
                <InfoLabel label="Start Date" content={resource?.start_date || "N/A"} />
                <InfoLabel label="Daily hours required" content={resource?.daily_hours_required.split(".")[0] || "N/A"} />
            </div>
        </div >
    )
}

const ResourceMandatoryForm = ({ loading, setLoading, resourceDetails, setMandatoryDetails }: any) => {
    const [resourceSfid, setResourceSfid] = useState<any>();

    //Skill States
    const [initialSkillsItems, setInitialSkillsItems] = useState<any[]>([]);
    const [skillsItems, setSkillsItems] = useState<any[]>([]);
    const [showSkillsSuggestions, setShowSkillsSuggestions] = useState(false);
    const skillsContainerRef: any = useRef(null);
    const [initialCheckedSkillsItems, setInitialCheckedSkillsItems] = useState<any[]>([]);
    const [checkedSkillsItems, setCheckedSkillsItems] = useState<any[]>([]);


    //Certification States
    const [initialCertificationsItems, setInitialCertificationsItems] = useState<any[]>([]);
    const [certificationsItems, setCertificationsItems] = useState<any[]>([]);
    const [showCertificationSuggestions, setShowCertificationSuggestions] = useState(false);
    const certificationsContainerRef: any = useRef(null);
    const [selectedTags, setSelectedTags] = useState<any>([]);
    const [initialCheckedCertificationsItems, setInitialCheckedCertificationsItems] = useState<any[]>([]);
    const [checkedCertificationsItems, setCheckedCertificationsItems] = useState<any[]>([]);

    const accountSfid = useSelector((state: any) => state.userSalesforceID)

    // console.log("initialCertificationsItems::", initialCertificationsItems);
    // console.log("initialSkillsItems::", initialSkillsItems);
    // console.log("initialCheckedCertificationsItems::", initialCheckedCertificationsItems);
    // console.log("initialCheckedSkillsItems::", initialCheckedSkillsItems);
    // console.log("checkedCertificationsItems::", checkedCertificationsItems);
    // console.log("checkedSkillsItems::", checkedSkillsItems);
    // console.log("certificationsItems::", certificationsItems);
    // console.log("skillsItems::", skillsItems);

    const getCompanyResourcesData = async () => {
        try {
            setLoading(true);
            const { results: contactProjects } = await getAllResourceRequest();
            const filteredResourceRequests = contactProjects.find((resource: any) => resource.id === resourceDetails.id);
            return filteredResourceRequests;
        } catch (error) {
            console.error("Error fetching resources:", error);
        } finally {
            setLoading(false);
        }
    }


    const getSkillRequirementByResourceRequestData = async (sfid: any) => {
        try {
            setLoading(true);
            const { results: skillRequirement } = await getSkillRequirementByResourceRequest(sfid);
            // setInitialSkillsItems(skillRequirement);
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    }

    const getCertificationsRequirementByResourceRequestData = async (sfid: any) => {
        try {
            setLoading(true);
            const { results: certificationsRequirement } = await getCertificationsRequirementByResourceRequest(sfid);
            // setInitialCertificationsItems(certificationsRequirement);
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    }

    const getSkillsDetails = async () => {
        try {
            setLoading(true);
            const { results: allSkills } = await getAllSalesforceSkills();
            setSkillsItems(allSkills);
            setInitialSkillsItems(allSkills)
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    }

    console.log("checkedCertificationItems", checkedCertificationsItems);

    const getCertificationDetails = async () => {
        try {
            setLoading(true);
            const { results: allCertifications } = await getAllSalesforceCertifications();
            setCertificationsItems(allCertifications);
            setInitialCertificationsItems(allCertifications)
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCertificationDetails();
        getSkillsDetails();
        if (resourceSfid) {
            getSkillRequirementByResourceRequestData(resourceSfid);
            getCertificationsRequirementByResourceRequestData(resourceSfid);
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (skillsContainerRef.current && !skillsContainerRef.current.contains(event.target as Node)) {
                setShowSkillsSuggestions(false);
            }
            if (certificationsContainerRef.current && !certificationsContainerRef.current.contains(event.target as Node)) {
                setShowCertificationSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    const handleItemOperation = async (
        item: any,
        type: 'skill' | 'certification',
        resourceDetails: any,
        operation: 'add' | 'delete',
    ) => {
        const filteredResource = await getCompanyResourcesData();
        console.log("filteredResource::", filteredResource);
        setResourceSfid(filteredResource.sfid);
        const body = type === 'skill'
            ? {
                "name": item.name,
                "resource_request_sfid": filteredResource.sfid,
                "skill_sfid": item.sfid,
                "skill_level": "Junior",
            } : {
                "name": item.name,
                "resource_request_sfid": filteredResource.sfid,
                "certification_sfid": item.sfid
            };

        console.log("body::", body);
        let apiFunction: any, successMessage: any;
        if (type === 'skill') {
            if (operation === 'add') {
                apiFunction = addSkillRequirement;
                successMessage = "Salesforce Skill requiremnet created Successfully";
            } else {
                apiFunction = deleteSkillRequirement;
                successMessage = "Salesforce Skill requiremnet deleted Successfully";
            }
        } else if (type === 'certification') {
            if (operation === 'add') {
                apiFunction = addCertificationsRequirement;
                successMessage = "Salesforce Certification requiremnet added Successfully";
            } else {
                apiFunction = deleteCertificationsRequirement;
                successMessage = "Salesforce Certification requiremnet deleted Successfully";
            }
        }

        try {
            setLoading(true);
            const response = operation === 'add' ? await apiFunction(body) : await apiFunction(item.sfid);
            if (response) {
                const checkedSkills: any = await getSkillRequirementByResourceRequestData(response.results.resource_request.sfid)
                setInitialCheckedSkillsItems(checkedSkills);
                const checkedCertifications: any = await getCertificationsRequirementByResourceRequestData(response.results.resource_request.sfid)
                setInitialCheckedCertificationsItems(checkedCertifications);
                toast.custom((t) => (
                    <SuccessfulToast t={t} message={successMessage} />
                ));
            }
        } catch (error: any) {
            toast.custom((t) => (
                <ErrorToast t={t} message={error?.response?.data?.error} />
            ));
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (
        item: any,
        checkedItems: any[],
        setCheckedItems: React.Dispatch<React.SetStateAction<any[]>>,
        items: any[],
        setItems: React.Dispatch<React.SetStateAction<any[]>>,
        initialItems: any[],
        type: 'skill' | 'certification',
        resourceDetails: any
    ) => {
        console.log("InitialItems::", initialItems);
        console.log("Items::", item);

        const isChecked = checkedItems.find((i: any) => i.sfid === item.sfid);
        const targetItem = initialItems.find((i: any) => i.sfid === item.sfid);
        console.log("targetItem::", targetItem);
        console.log("isChecked::", isChecked);

        if (isChecked) {
            const uncheckedItem = checkedItems.find(i => i.sfid === item.sfid);
            if (uncheckedItem) {
                setItems([...items, uncheckedItem]);
                setCheckedItems(checkedItems.filter(i => i.sfid !== item.sfid));
                handleItemOperation(item, type, resourceDetails, 'delete');
            }
        } else {
            setCheckedItems([...checkedItems, targetItem]);
            setItems(items.filter((i: any) => i.sfid !== item.sfid));
            handleItemOperation(item, type, resourceDetails, 'add');
        }
    };

    const handleSuggestionSelect = (
        item: any,
        handleCheckboxChange: (item: any) => void,
        setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        handleCheckboxChange(item);
        setShowSuggestions(false);
    };

    const filterbyCategory = (category: any) => {
        if (selectedTags.includes(category)) {
            const updatedTags = selectedTags.filter((tag: any) => tag !== category);
            setSelectedTags(updatedTags);
            if (updatedTags.length === 0) {
                setCertificationsItems(initialCertificationsItems);
            } else {
                const filtered = initialCertificationsItems.filter((item: any) => updatedTags.includes(item.type));
                setCertificationsItems(filtered);
            }
        } else {
            const updatedTags = [...selectedTags, category];
            setSelectedTags(updatedTags);
            const filtered = initialCertificationsItems.filter((item: any) => updatedTags.includes(item.type));
            setCertificationsItems(filtered);
        }
    };

    return (
        <>
            {loading ? <>
                <div className='flex flex-row justify-between gap-6 w-full py-4 px-4'>
                    <div className='flex flex-row gap-6 w-full py-4'>
                        <div className='animate-pulse w-1/4 h-12 rounded-full bg-gray-200' />
                        <div className='animate-pulse w-1/4 h-12 rounded-full bg-gray-200' />
                        <div className='animate-pulse w-1/4 h-12 rounded-full bg-gray-200' />
                    </div>
                    <div className='flex flex-row justify-end gap-6 w-full py-4'>
                        <div className='animate-pulse w-1/4 h-12 rounded-xl bg-gray-200' />
                        <div className='animate-pulse w-1/4 h-12 rounded-xl bg-gray-200' />
                    </div>
                </div>
                <div className='flex flex-col justify-between gap-6 w-full py-4'>
                    <div className='animate-pulse w-full h-60 rounded-xl bg-gray-200' />
                </div>
            </> : <>
                <div className='w-full p-2 md:p-4 z-20 border-b bg-white flex flex-col md:flex-row justify-between gap-4 items-center'>
                    <span className='text-md md:text-2xl font-bold text-gray-700 text-nowrap flex flex-row items-center justify-center gap-4'>
                        Raise Resource Request for
                    </span>
                    <div className='flex flex-row gap-4'>
                        <button
                            type='button'
                            onClick={() => setMandatoryDetails(false)}
                            disabled={loading}
                            className={`h-8 md:h-12 px-3 md:px-6 rounded-lg md:rounded-xl font-medium text-normal ${loading
                                ? 'bg-blue-300 text-blue-100 cursor-not-allowed'
                                : 'bg-blue-500 text-white'
                                }`}>
                            Create Resource Request
                        </button>
                    </div>
                </div>
                <div className='relative'>
                    <div className='mt-6'>
                        <ResourceRequestCard resource={resourceDetails} />
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-6 px-6 h-80'>
                        <div className='flex flex-col w-full gap-6 py-6'>
                            <div className=''>
                                <h2 className='text-sm uppercase font-semibold'>Search Skills</h2>
                                <div ref={skillsContainerRef} className='relative mt-4'>
                                    {loading ?
                                        <div className='animate-pulse w-full h-12 rounded-xl bg-gray-200' /> :
                                        <InputField
                                            className='w-full'
                                            iconName='search'
                                            placeHolder='Search your skills (Ex. Salesforce, Mulesoft, Heroku)'
                                            onChange={(e: any) => {
                                                if (e.target.value.trim()) {
                                                    const filtered = skillsItems.filter((item: any) => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
                                                    setSkillsItems(filtered);
                                                    setShowSkillsSuggestions(true);
                                                } else setSkillsItems(initialSkillsItems)
                                            }}
                                            onFocus={() => setShowSkillsSuggestions(true)}
                                        />
                                    }

                                    {showSkillsSuggestions && (
                                        <div className='absolute bg-white border-2 left-0 border-gray-200 rounded-xl shadow-sm w-full mt-1 max-h-48 overflow-y-auto z-30'>
                                            {skillsItems?.length > 0 ? (
                                                skillsItems.map((item: any) => (
                                                    <div
                                                        key={item.sfid}
                                                        className='flex items-center gap-2 p-3 border border-b-0 cursor-pointer hover:bg-gray-100'
                                                        onMouseDown={() => {
                                                            handleSuggestionSelect(
                                                                item,
                                                                () => handleCheckboxChange(
                                                                    item,
                                                                    checkedSkillsItems,
                                                                    setCheckedSkillsItems,
                                                                    skillsItems,
                                                                    setSkillsItems,
                                                                    initialSkillsItems,
                                                                    'skill',
                                                                    resourceDetails
                                                                ),
                                                                setShowSkillsSuggestions
                                                            );
                                                        }}
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
                            <div className='flex-1'>
                                <h2 className='text-sm uppercase font-semibold z-10'>Selected Skills</h2>
                                <div className='pt-4 flex flex-row gap-4 flex-nowrap lg:flex-wrap z-40 overflow-x-auto w-full appearance-none'>
                                    {loading ?
                                        <>
                                            <div className={`animate-pulse inline-flex w-1/6 h-8 gap-2 items-center bg-gray-200 border p-2 pl-4 pr-4 rounded-full`} />
                                            <div className={`animate-pulse inline-flex w-1/6 h-8 gap-2 items-center bg-gray-200 border p-2 pl-4 pr-4 rounded-full`} />
                                        </>
                                        :
                                        <>
                                            {checkedSkillsItems.length > 0 ? checkedSkillsItems.map((item: any, index: any) => (
                                                <SkillCheckboxItem
                                                    key={item.sfid}
                                                    id={item.sfid}
                                                    checked={checkedSkillsItems.some(checkedItem => checkedItem.sfid === item.sfid)}
                                                    onChange={() => {
                                                        handleCheckboxChange(
                                                            item,
                                                            checkedSkillsItems,
                                                            setCheckedSkillsItems,
                                                            skillsItems,
                                                            setSkillsItems,
                                                            initialSkillsItems,
                                                            'skill',
                                                            resourceDetails
                                                        )
                                                    }}
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
                        </div>
                        <div className='flex flex-col w-full gap-6 py-6'>
                            <div className=''>
                                <h2 className='font-semibold mb-4 uppercase text-sm'>Search Certifications</h2>
                                <div ref={certificationsContainerRef} className='relative mt-4'>
                                    {loading ?
                                        <div className='animate-pulse w-full h-12 rounded-xl bg-gray-200' /> :
                                        <InputField
                                            className='w-full z-10'
                                            iconName='search'
                                            placeHolder='Search your Certifications (Ex. Salesforce Administrator, Salesforce Developer)'
                                            onChange={(e: any) => {
                                                if (e.target.value.trim()) {
                                                    const filtered = certificationsItems.filter((item: any) => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
                                                    setCertificationsItems(filtered);
                                                    setShowCertificationSuggestions(true);
                                                } else setCertificationsItems(initialCertificationsItems)
                                            }}
                                            onFocus={() => setShowCertificationSuggestions(true)}
                                        />
                                    }

                                    {showCertificationSuggestions && (
                                        <div className='absolute overflow-x-scroll bg-white border-2 left-0 border-gray-100 rounded-xl w-full mt-1 max-h-56 overflow-y-auto z-20'>
                                            <div className='sticky top-0 w-full flex items-center gap-2 bg-white p-2 px-4 whitespace-nowrap'>
                                                <span className='text-sm'>
                                                    Filter by:
                                                </span>
                                                <div className='flex overflow-x-scroll no-scrollbar gap-2 items-center'>
                                                    {filterbyCertificates.map((item: any, index: number) => {
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
                                            {certificationsItems?.length > 0 ? (
                                                certificationsItems?.map((item: any) => (
                                                    <div
                                                        key={item.sfid}
                                                        className='flex items-center justify-between gap-2 p-3 border border-b-0 cursor-pointer hover:bg-gray-100'
                                                        onMouseDown={() => {
                                                            handleSuggestionSelect(
                                                                item,
                                                                () => handleCheckboxChange(
                                                                    item,
                                                                    checkedCertificationsItems,
                                                                    setCheckedCertificationsItems,
                                                                    certificationsItems,
                                                                    setCertificationsItems,
                                                                    initialCertificationsItems,
                                                                    'certification',
                                                                    resourceDetails
                                                                ),
                                                                setShowCertificationSuggestions
                                                            );
                                                        }}
                                                    >
                                                        <div className='inline-flex items-center gap-2'>
                                                            <img className='w-8 h-auto' src={'/' + item.name.split(' ').join('-') + '.png'} alt={item.text} />
                                                            <span className='font-bold text-gray-800 ml-4'>{item.name}</span>
                                                        </div>

                                                        <span className='text-xs'>{item.type}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className='text-md text-gray-400 p-4'>No matching Certification</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='flex-1'>
                                <h2 className='text-sm uppercase font-semibold mb-4'>Selected Certifications</h2>
                                <div className='mt-2 flex flex-row gap-4 flex-nowrap lg:flex-wrap z-40 overflow-x-auto w-full appearance-none'>
                                    {loading ?
                                        <>
                                            <div className={`animate-pulse inline-flex w-1/3 h-20 gap-2 items-center bg-gray-200 border p-2 pl-4 pr-4 rounded-full`} />
                                            <div className={`animate-pulse inline-flex w-1/3 h-20 gap-2 items-center bg-gray-200 border p-2 pl-4 pr-4 rounded-full`} />
                                        </>
                                        :
                                        <>
                                            {checkedCertificationsItems.length > 0 ? checkedCertificationsItems.map(item => (
                                                <CertificationCheckboxItem
                                                    key={item.sfid}
                                                    text={item.name}
                                                    imageSrc={item.name}
                                                    checked={checkedCertificationsItems.some(checkedItem => checkedItem.sfid === item.sfid)}
                                                    onChange={() => {
                                                        handleCheckboxChange(
                                                            item,
                                                            checkedCertificationsItems,
                                                            setCheckedCertificationsItems,
                                                            certificationsItems,
                                                            setCertificationsItems,
                                                            initialCertificationsItems,
                                                            'certification',
                                                            resourceDetails
                                                        )
                                                    }}
                                                />
                                            )) : (
                                                <span className="text-md font-normal text-gray-400 ml-2">
                                                    No Certification Selected...
                                                </span>
                                            )}
                                        </>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}

export default ResourceMandatoryForm
