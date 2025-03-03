"use client"
import InputField from '@/components/InputField'
import ErrorToast from '@/components/toast/ErrorToast'
import SuccessfulToast from '@/components/toast/SuccessfulToast'
import { filterby } from '@/constants/data'
import { onBoardingHandleNext } from '@/feature/reducers/userOnboarding'
import { CertificationsService, getAllSalesforceCertifications } from '@/lib/service/portfolio.service'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const CheckboxItem = ({ text, imageSrc, borderColor, textColor, checked, onChange, loadingUI }: any) => {
    return (
        <div className={`inline-flex gap-2 items-center bg-white border ${borderColor} p-2 pl-4 pr-4 rounded-full relative z-10 whitespace-nowrap min-w-max`}>
            <img className='w-auto h-10 lg:h-16' src={imageSrc} alt={text} />
            <span className={`font-bold text-xs lg:text-sm ${textColor}`}>
                {text.replace(/salesforce/i, '')}
            </span>
            <input
                disabled={loadingUI}
                type="checkbox"
                className={`w-6 h-6 ${textColor} bg-gray-100 border-2 border-blue-500 rounded-xl appearance-none `}
                checked={checked}
                onChange={onChange}
            />
            {checked && (
                <button
                    disabled={loadingUI}
                    className={`absolute right-[1.12rem] w-5 h-5 flex items-center justify-center bg-blue-400 rounded-full cursor-pointer`}
                    onClick={onChange}
                >
                    <X className="w-4 h-4" strokeWidth={2} color='white' />
                </button>
            )}
        </div>
    );
};

const Certifications = ({ type = "add" }: any) => {

    const dispatch = useDispatch();
    const [items, setItems] = useState<any[]>([]);
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [checkedItems, setCheckedItems] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [initialItems, setInitialItems] = useState<any[]>([]);
    const [initialCheckedItems, setInitialCheckedItems] = useState<any[]>([]);
    const [selectedTags, setSelectedTags] = useState<any>([]);
    const containerRef: any = useRef(null);
    const [loading, setLoading] = useState(false);
    const [loadingUI, setLoadingUI] = useState(false);
    const contactSfid = useSelector((state: any) => state.userSalesforceID)

    const getCertificationDetails = async (reloadType: any) => {
        try {
            if (reloadType === "initial") setLoading(true);
            else if (reloadType === "update") setLoadingUI(true);

            const { results: allCertifications } = await getAllSalesforceCertifications();
            const { results: assignedCertifications } = await CertificationsService.getAllAssignedCertifications(contactSfid);
            console.log("assignedCertifications::", assignedCertifications);

            const assignedCertificationIds = assignedCertifications.map((cert: any) => cert.certification);
            setInitialItems(allCertifications)
            setInitialCheckedItems(assignedCertifications)
            setItems(allCertifications.filter((item: any) => !assignedCertificationIds.includes(item.sfid)));
            setFilteredItems(allCertifications.filter((item: any) => !assignedCertificationIds.includes(item.sfid)))
            setCheckedItems(
                allCertifications
                    .filter((item: any) => assignedCertificationIds.includes(item.sfid))
                    .map((item: any) => {
                        const assignedCert = assignedCertifications.find((cert: any) => cert.certification === item.sfid);
                        return { ...item, id: assignedCert?.id };
                    })
            );            

        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            if (reloadType === "initial") setLoading(false);
            else if (reloadType === "update") setLoadingUI(false);
        }
    };

    console.log("Checked Items", checkedItems);


    useEffect(() => {
        getCertificationDetails("initial");

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

    const handleNext = async () => {
        dispatch(onBoardingHandleNext({ role: "developer", stepperId: 1 }))
    }

    const addCertification = async (sfid: any) => {
        const body: any = {
            "contact_sfid": contactSfid,
            "certification_sfids": [sfid]
        }
        try {
            setLoadingUI(true)
            return await CertificationsService.assignCertification(body);
        } catch (error: any) {
            return false;
        }
        finally {
            setLoadingUI(false)
        }
    }

    const deleteCertification = async (id: string) => {
        try {
            setLoadingUI(true)
            return await CertificationsService.deleteAssignedCertifications(id);
        } catch (error: any) {
            return false;
        }
        finally {
            setLoadingUI(false)
        }
    }

    useEffect(() => {
        let tempInputValue = inputValue.trim()
        if (tempInputValue) {
            const filtered = items.filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()));
            setFilteredItems(filtered);
        } else setFilteredItems(items)
    }, [inputValue]);

    const handleCheckboxChange = async (id: any, sfid: any) => {
        const isChecked = checkedItems.find((i: any) => i.id === id);
        const item = initialItems.find((i: any) => i.sfid === sfid);

        if (isChecked) {
            const uncheckedItem = checkedItems.find(i => i.id === id);
            console.log("uncheckedItem::", uncheckedItem);

            if (uncheckedItem) {
                const response = await deleteCertification(id)
                if (response) {
                    getCertificationDetails("update").then(response => {
                        // toast.custom((t) => (
                        //     <SuccessfulToast t={t} message={"Certification deleted Successfully"} />
                        // ));
                    })
                } else {
                    // toast.custom((t) => (
                    //     <ErrorToast t={t} message={"Certification deleted Failed"} />
                    // ))
                }
            }
        } else {
            const response = await addCertification(sfid)
            if (response) {
                getCertificationDetails("update").then(response => {
                    // toast.custom((t) => (
                    //     <SuccessfulToast t={t} message={"Certification added Successfully"} />
                    // ));
                })
            } else {
                // toast.custom((t) => (
                //     <ErrorToast t={t} message={"Certification added Failed"} />
                // ))
            }
        }
    };


    const handleSuggestionSelect = (item: any) => {
        setInputValue(item.text);
        handleCheckboxChange(item.id, item.sfid);
        setShowSuggestions(false);
        setInputValue("")
    }

    const filterbyCategory = (category: any) => {
        if (selectedTags.includes(category)) {
            const updatedTags = selectedTags.filter((tag: any) => tag !== category);
            setSelectedTags(updatedTags);
            if (updatedTags.length === 0) {
                setFilteredItems(items);
            } else {
                const filtered = initialItems.filter(item => updatedTags.includes(item.type));
                setFilteredItems(filtered);
            }
        } else {
            const updatedTags = [...selectedTags, category];
            setSelectedTags(updatedTags);
            const filtered = initialItems.filter(item => updatedTags.includes(item.type));
            setFilteredItems(filtered);
        }
    };

    return (
        <div className={`${type === "add" && "bg-white rounded-3xl border border-gray-300 relative px-5 lg:px-10 bg-[url(https://wp.sfdcdigital.com/en-in/wp-content/uploads/sites/21/2023/03/pb-hp-products-bg-2.png?resize=2048,410)] bg-contain min-h-full bg-fixed bg-no-repeat bg-bottom"}`}>
            {type === "add" && (
                <div className='w-full bg-white z-20 sticky top-0 left-0 py-6 flex flex-col gap-6 lg:flex-row justify-between items-start lg:items-center'>
                    <span>
                        <h1 className='text-start text-4xl md:text-5xl font-heading tracking-tight font-medium text-black'>
                            Complete your Profile
                        </h1>
                        <p className='pt-2 tracking-tight text-gray-600 max-w-sm'>
                            Select Salesforce Certifications that you hold
                        </p>
                    </span>
                    <div className='flex flex-row gap-2 justify-center items-end lg:items-center'>
                        <button
                            disabled={loading || loadingUI}
                            onClick={handleNext}
                            className={`h-12 px-6 rounded-xl font-medium text-normal ${loading
                                ? 'bg-blue-300 text-blue-100 cursor-not-allowed'
                                : 'bg-blue-500 text-white'
                                }`}>
                            Save & Next
                        </button>
                    </div>
                </div>
            )}

            <div className='py-6'>
                <h2 className='font-semibold mb-4 uppercase text-sm'>Search Certifications</h2>
                <div ref={containerRef} className='relative mt-4'>
                    {loading ?
                        <div className='animate-pulse w-full lg:w-1/2 h-12 rounded-xl bg-gray-200' /> :
                        <InputField
                            className='w-full lg:w-1/2 z-10'
                            iconName='search'
                            placeHolder='Search your Certifications (Ex. Salesforce Administrator, Salesforce Developer)'
                            value={inputValue}
                            onChange={(e: any) => {
                                setInputValue(e.target.value)
                            }}
                            disabled={loadingUI}
                            onFocus={() => setShowSuggestions(true)}
                        />
                    }

                    {showSuggestions && !loadingUI && (
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
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item) => (
                                    <div
                                        key={item.sfid}
                                        className='flex items-center justify-between gap-2 p-3 border border-b-0 cursor-pointer hover:bg-gray-100'
                                        onMouseDown={() => handleSuggestionSelect(item)}
                                    >
                                        <div className='inline-flex items-center gap-2'>
                                            <img className='w-8 h-auto' src={item.url} alt={item.text} />
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
                <div className='mt-2 flex flex-row gap-4 flex-wrap z-40 overflow-x-auto w-full appearance-none'>
                    {loading ?
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
                                    imageSrc={item.url}
                                    checked={checkedItems.some(checkedItem => checkedItem.sfid === item.sfid)}
                                    onChange={() => handleCheckboxChange(item.id, item.sfid)}
                                    loadingUI={loadingUI}
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
    )
}

export default Certifications;
