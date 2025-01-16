"use client"
import Modal from '@/components/modal/Modal';
import { PencilIcon, ShieldCheck, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import Certifications from '../onboarding/Certifications';
import InputField from '@/components/InputField';
import ErrorToast from '@/components/toast/ErrorToast';
import SuccessfulToast from '@/components/toast/SuccessfulToast';
import { filterby } from '@/constants/data';
import { onBoardingHandleNext } from '@/feature/reducers/userOnboarding';
import { getAllSalesforceCertifications, getAllAssignedCertifications, assignCertification, deleteAssignedCertifications } from '@/lib/service/portfolio.service';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const CertificationComponent = ({
    src,
    name,
    onSelectCertification
}: any) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        const updatedChecked = !isChecked;
        setIsChecked(updatedChecked);
        onSelectCertification(name, updatedChecked);
    };

    return (
        <div className='flex flex-col border-r border-r-gray-200 pr-4 cursor-pointer'>
            {onSelectCertification && (
                <input
                    id={name}
                    type='checkbox'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            )}
            <label htmlFor={name} className='cursor-pointer flex flex-col items-center gap-2'>
                <img className='w-24' src={'/' + name.split(' ').join('-') + '.png'} alt={name} />
                <span className='capitalize text-sm font-bold text-center text-gray-600 max-w-[12rem]'>
                    {name.replace(/salesforce/i, '')}
                </span>
            </label>
        </div >
    )
}

const CheckboxItem = ({ text, imageSrc, borderColor, textColor, checked, onChange }: any) => {
    return (
        <div className={`inline-flex gap-2 items-center bg-white border ${borderColor} p-2 pl-4 pr-4 rounded-full relative z-10 whitespace-nowrap min-w-max`}>
            <img className='w-auto h-16' src={'/' + imageSrc.split(' ').join('-') + '.png'} alt={text} />
            <span className={`font-bold text-sm ${textColor}`}>
                {text.replace(/salesforce/i, '')}
            </span>
            <input
                type="checkbox"
                className={`w-6 h-6 ${textColor} bg-gray-100 border-2 border-blue-500 rounded-xl appearance-none `}
                checked={checked}
                onChange={onChange}
            />
            {checked && (
                <button
                    className={`absolute right-[1.12rem] w-5 h-5 flex items-center justify-center bg-blue-400 rounded-full cursor-pointer`}
                    onClick={onChange}
                >
                    <X className="w-4 h-4" strokeWidth={2} color='white' />
                </button>
            )}
        </div>
    );
};

const DeveloperProfileCertification = ({ certification, loading, updateDetails }: any) => {
    const [visibleCount, setVisibleCount] = useState(6);
    const [showAll, setShowAll] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const [items, setItems] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [checkedItems, setCheckedItems] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [initialItems, setInitialItems] = useState<any[]>([]);
    const [initialCheckedItems, setInitialCheckedItems] = useState<any[]>([]);
    const [selectedTags, setSelectedTags] = useState<any>([]);
    const containerRef: any = useRef(null);
    const [loadingUI, setLoadingUI] = useState(false);
    const contactSfid = useSelector((state: any) => state.userSalesforceID)

    const getCertificationDetails = async () => {
        try {
            setLoadingUI(true);
            const { results: allCertifications } = await getAllSalesforceCertifications();
            const { results: assignedCertifications } = await getAllAssignedCertifications(contactSfid);
            const assignedCertificationIds = assignedCertifications.map((cert: any) => cert.certification);
            setInitialItems(allCertifications)
            setInitialCheckedItems(assignedCertifications)
            setItems(allCertifications.filter((item: any) => !assignedCertificationIds.includes(item.sfid)));
            setCheckedItems(allCertifications.filter((item: any) => assignedCertificationIds.includes(item.sfid)));
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoadingUI(false);
        }
    };

    useEffect(() => {
        getCertificationDetails();

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!showModal) {
            updateDetails()
        }
    }, [showModal])

    const addCertification = async (sfid: any) => {
        const body: any = {
            "contact_sfid": contactSfid,
            "certification_sfids": [sfid]
        }
        try {
            setLoadingUI(true)
            const response = await assignCertification(body);
            console.log(response);

            if (response) {
                toast.custom((t) => (
                    <SuccessfulToast t={t} message={"Certification added Successfully"} />
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

    const deleteCertification = async (sfid: string) => {
        try {
            setLoadingUI(true)
            const id = initialCheckedItems.find((item) => item.certification === sfid)?.sfid;
            const response = await deleteAssignedCertifications(id);
            if (response) {
                toast.custom((t) => (
                    <SuccessfulToast t={t} message={"Certification Deleted Successfully"} />
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

    useEffect(() => {
        let tempInputValue = inputValue.trim()
        if (tempInputValue) {
            const filtered = initialItems.filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()));
            setItems(filtered);
        } else setItems(initialItems)
    }, [inputValue]);

    const handleCheckboxChange = (id: any) => {
        const isChecked = checkedItems.find((i: any) => i.sfid === id);
        const item = initialItems.find((i: any) => i.sfid === id);
        if (isChecked) {
            const uncheckedItem = checkedItems.find(i => i.sfid === id);
            if (uncheckedItem) {
                setItems([...items, uncheckedItem]);
                setCheckedItems(checkedItems.filter(i => i.sfid !== id));
                deleteCertification(id)
            }
        } else {
            setCheckedItems([...checkedItems, item]);
            setItems(items.filter((i: any) => i.sfid !== id));
            addCertification(id)
        }
    };

    const handleSuggestionSelect = (item: any) => {
        setInputValue(item.text);
        handleCheckboxChange(item.sfid);
        setShowSuggestions(false);
        setInputValue("")
    }

    const filterbyCategory = (category: any) => {
        if (selectedTags.includes(category)) {
            const updatedTags = selectedTags.filter((tag: any) => tag !== category);
            setSelectedTags(updatedTags);
            if (updatedTags.length === 0) {
                setItems(initialItems);
            } else {
                const filtered = initialItems.filter(item => updatedTags.includes(item.type));
                setItems(filtered);
            }
        } else {
            const updatedTags = [...selectedTags, category];
            setSelectedTags(updatedTags);
            const filtered = initialItems.filter(item => updatedTags.includes(item.type));
            setItems(filtered);
        }
    };

    const handleShowMore = () => {
        setShowAll(!showAll);
        setVisibleCount(showAll ? 6 : certification.length);
    };
    return (
        <>
            <div className='bg-gray-50 rounded-2xl w-full p-4 lg:p-6'>
                <div className='flex flex-row justify-between items-center'>
                    <span className='text-2xl font-bold inline-flex items-center gap-2'>
                        <ShieldCheck /> Salesforce Certifications
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

                <div className='flex flex-row gap-6 py-6 flex-wrap justify-start'>
                    {loading ?
                        <div className='flex flex-row gap-4 w-full flex-nowrap'>
                            <div className='animate-pulse w-1/6 h-36 rounded-3xl bg-gray-200' />
                            <div className='animate-pulse w-1/6 h-36 rounded-3xl bg-gray-200' />
                            <div className='animate-pulse w-1/6 h-36 rounded-3xl bg-gray-200' />
                        </div> :
                        <>
                            {certification?.length > 0 ? <>
                                {certification?.slice(0, visibleCount)?.map((cert: any, index: any) => (
                                    <CertificationComponent key={index} name={cert.certification_name} src={cert.src} />
                                ))}
                                {certification?.length > 6 && (
                                    <button onClick={handleShowMore} className='text-blue-700 font-bold'>
                                        {showAll ? 'Show Less' : 'Show More'}
                                    </button>
                                )}
                            </> :
                                <div className='text-center text-black text-sm'>
                                    No certifications found
                                </div>}
                        </>}
                </div>
            </div>
            {showModal && (
                <Modal
                    header="Edit Certification"
                    setModal={setShowModal}
                    loading={loadingUI}
                    size="xl"
                    isFooter={false}
                >
                    <div className='py-6'>
                        <h2 className='font-semibold mb-4 uppercase text-sm'>Search Certifications</h2>
                        <div ref={containerRef} className='relative mt-4'>
                            {loadingUI ?
                                <div className='animate-pulse w-full lg:w-1/2 h-12 rounded-xl bg-gray-200' /> :
                                <InputField
                                    className='w-full lg:w-1/2 z-10'
                                    iconName='search'
                                    placeHolder='Search your Certifications (Ex. Salesforce Administrator, Salesforce Developer)'
                                    value={inputValue}
                                    onChange={(e: any) => {
                                        setInputValue(e.target.value)
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                />
                            }

                            {showSuggestions && (
                                <div className='absolute overflow-x-scroll bg-white border-2 left-0 border-gray-100 rounded-xl w-full lg:w-1/2 mt-1 max-h-56 overflow-y-auto z-20'>
                                    <div className='sticky top-0 w-full flex items-center gap-2 bg-white p-2 px-4 whitespace-nowrap'>
                                        <span className='text-sm'>
                                            Filter by:
                                        </span>
                                        <div className='flex overflow-x-scroll no-scrollbar gap-2 items-center'>
                                            {filterby.map((item: any, index: number) => {
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
                                    {items.length > 0 ? (
                                        items.map((item) => (
                                            <div
                                                key={item.sfid}
                                                className='flex items-center justify-between gap-2 p-3 border border-b-0 cursor-pointer hover:bg-gray-100'
                                                onMouseDown={() => handleSuggestionSelect(item)}
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
                        <h2 className='text-sm uppercase font-semibold mt-6'>Selected Certifications</h2>
                        <div className='mt-2 flex flex-row gap-4 flex-nowrap lg:flex-wrap z-40 overflow-x-auto w-full appearance-none'>
                            {loadingUI ?
                                <>
                                    <div className={`animate-pulse inline-flex w-1/3 h-20 gap-2 items-center bg-gray-200 border p-2 pl-4 pr-4 rounded-full`} />
                                    <div className={`animate-pulse inline-flex w-1/3 h-20 gap-2 items-center bg-gray-200 border p-2 pl-4 pr-4 rounded-full`} />
                                </>
                                :
                                <>
                                    {checkedItems.length > 0 ? checkedItems.map(item => (
                                        <CheckboxItem
                                            key={item.sfid}
                                            text={item.name}
                                            imageSrc={item.name}
                                            checked={checkedItems.some(checkedItem => checkedItem.sfid === item.sfid)}
                                            onChange={() => handleCheckboxChange(item.sfid)}
                                        />
                                    )) : (
                                        <span className="text-md font-normal text-gray-400 ml-2">
                                            No Certification Selected...
                                        </span>
                                    )}
                                </>}
                        </div>
                    </div>
                </Modal>
            )}
        </>

    )
}

export default DeveloperProfileCertification
