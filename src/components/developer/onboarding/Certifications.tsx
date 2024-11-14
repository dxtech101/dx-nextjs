"use client"
import InputField from '@/components/InputField'
import { onBoardingHandleNext } from '@/feature/reducers/developerOnboarding'
import { ChevronDown, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const CheckboxItem = ({ text, imageSrc, bgColor, borderColor, textColor, checked, onChange, checkedColor }: any) => {
    return (
        <div className={`inline-flex gap-2 items-center bg-white border ${borderColor} p-2 pl-4 pr-4 rounded-full relative z-10 whitespace-nowrap min-w-max`}>
            <img className='w-auto h-16' src={imageSrc} alt={text} />
            <span className={`font-bold text-sm ${textColor}`}>
                {text}
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

export const CertificationComponent = ({
    src,
    id,
    onSelectCertification
}: any) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        const updatedChecked = !isChecked;
        setIsChecked(updatedChecked);
        onSelectCertification(id, updatedChecked);
    };

    return (
        <div className='flex flex-col border-r border-r-gray-200 pr-4 cursor-pointer'>
            {onSelectCertification && (
                <input
                    id={id}
                    type='checkbox'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            )}
            <label htmlFor={id} className='cursor-pointer flex flex-col items-center gap-2'>
                <img className='w-24' src={src} alt='' />
                <span className='capitalize text-sm font-bold text-gray-600 max-w-xs'>
                    {id.split('-').join(' ')}
                </span>
            </label>
        </div >
    )
}

const Certifications = () => {
    const initialItems = [
        { id: "administrator", text: "Salesforce Administrator", src: "/Administrator.png", category: "Salesforce Administrator" },
        { id: "advanced-administrator", text: "Advanced Administrator", src: "/Advanced-Administrator.png", category: "Salesforce Administrator" },
        { id: "platform-app-builder", text: "Platform App Builder", src: "/Platform-App-Builder.png", category: "Salesforce Administrator" },

        { id: "javascript-developer-i", text: "JavaScript Developer I", src: "/JavaScript-Developer-I.png", category: "Salesforce Developer" },
        { id: "platform-developer-i", text: "Platform Developer I", src: "/Platform-Developer-I.png", category: "Salesforce Developer" },
        { id: "platform-developer-ii", text: "Platform Developer II", src: "/Platform-Developer-II.png", category: "Salesforce Developer" },
        { id: "industries-cpq-developer", text: "Industries CPQ Developer", src: "/Industries-CPQ-Developer.png", category: "Salesforce Developer" },
        { id: "b2c-commerce-developer", text: "B2C Commerce Developer", src: "/B2C-Commerce-Developer.png", category: "Salesforce Developer" },

        { id: "application-architect", text: "Application Architect", src: "/Application-Architect.png", category: "Salesforce Architect" },
        { id: "system-architect", text: "System Architect", src: "/System-Architect.png", category: "Salesforce Architect" },
        { id: "technical-architect", text: "Technical Architect", src: "/Technical-Architect.png", category: "Salesforce Architect" },
        { id: "b2c-solution-architect", text: "B2C Solution Architect", src: "/B2C-Solution-Architect.png", category: "Salesforce Architect" },
        { id: "heroku-architect", text: "Heroku Architect", src: "/Heroku-Architect.png", category: "Salesforce Architect" },
        { id: "data-architect", text: "Data Architect", src: "/Data-Architect.png", category: "Salesforce Architect" },
        { id: "integration-architect", text: "Integration Architect", src: "/Integration-Architect.png", category: "Salesforce Architect" },
        { id: "sharing-and-visibility-architect", text: "Sharing and Visibility Architect", src: "/Sharing-and-Visibility-Architect.png", category: "Salesforce Architect" },
        { id: "id-and-access-mgmt-architect", text: "ID and Access Mgmt Architect", src: "/ID-and-Access-Mgmt-Architect.png", category: "Salesforce Architect" },
        { id: "dev-lifecycle-and-deploy-architect", text: "Dev Lifecycle and Deploy Architect", src: "/Dev-Lifecycle-and-Deploy-Architect.png", category: "Salesforce Architect" },

        { id: "sales-cloud-consultant", text: "Sales Cloud Consultant", src: "/Sales-Cloud-Consultant.png", category: "Salesforce Consultant" },
        { id: "service-cloud-consultant", text: "Service Cloud Consultant", src: "/Service-Cloud-Consultant.png", category: "Salesforce Consultant" },
        { id: "marketing-cloud-consultant", text: "Marketing Cloud Consultant", src: "/Marketing-Cloud-Consultant.png", category: "Salesforce Consultant" },
        { id: "experience-cloud-consultant", text: "Experience Cloud Consultant", src: "/Experience-Cloud-Consultant.png", category: "Salesforce Consultant" },
        { id: "education-cloud-consultant", text: "Education Cloud Consultant", src: "/Education-Cloud-Consultant.png", category: "Salesforce Consultant" },
        { id: "field-service-consultant", text: "Field Service Consultant", src: "/Field-Service-Consultant.png", category: "Salesforce Consultant" },
        { id: "nonprofit-cloud-consultant", text: "Nonprofit Cloud Consultant", src: "/Nonprofit-Cloud-Consultant.png", category: "Salesforce Consultant" },
        { id: "omnistudio-consultant", text: "OmniStudio Consultant", src: "/OmniStudio-Consultant.png", category: "Salesforce Consultant" }
    ];

    const dispatch = useDispatch();
    const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
    const [accordian, setAccordian] = useState(0)
    const [items, setItems] = useState<any[]>(initialItems);
    const [inputValue, setInputValue] = useState('');
    const [checkedItems, setCheckedItems] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredItems, setFilteredItems] = useState<any[]>(initialItems);

    const handleNext = () => {
        console.log('Selected Certifications:', selectedCertifications);
        dispatch(onBoardingHandleNext({ stepperId: 1 }))
    }

    useEffect(() => {
        let tempInputValue = inputValue.trim()
        if (tempInputValue) {
            const filtered = initialItems.filter(item => item.text.toLowerCase().includes(inputValue.toLowerCase()));
            setItems(filtered);
        } else setItems(initialItems)
    }, [inputValue]);

    const handleCheckboxChange = (id: number) => {
        const isChecked = checkedItems.find((i: any) => i.id === id);
        const item = initialItems.find((i: any) => i.id === id);
        console.log("isChecked::", isChecked)
        console.log("item::", item)

        if (isChecked) {
            const uncheckedItem = checkedItems.find(i => i.id === id);
            if (uncheckedItem) {
                setItems([...items, uncheckedItem]);
                setCheckedItems(checkedItems.filter(i => i.id !== id));
            }
        } else {
            setCheckedItems([...checkedItems, item]);
            setItems(items.filter((i: any) => i.id !== id));
        }
    };

    const handleSuggestionSelect = (item: any) => {
        setInputValue(item.text);
        handleCheckboxChange(item.id);
        setShowSuggestions(false);
        setInputValue("")
    }

    return (
        <div className='bg-white rounded-3xl border border-gray-300 relative px-5 lg:px-10 bg-[url(https://wp.sfdcdigital.com/en-in/wp-content/uploads/sites/21/2023/03/pb-hp-products-bg-2.png?resize=2048,410)] bg-contain min-h-full bg-fixed bg-no-repeat bg-bottom'>
            <div className='w-full bg-white z-20 sticky top-0 left-0 py-6 flex flex-col gap-6 lg:flex-row justify-between items-start lg:items-center'>
                <span>
                    <h1 className='text-start text-4xl md:text-5xl font-heading tracking-tight font-medium text-black'>
                        Certification Details
                    </h1>
                    <p className='pt-2 tracking-tight text-gray-600 max-w-sm'>
                        Select Salesforce Certifications that you hold
                    </p>
                </span>
                <div className='flex flex-row gap-2 justify-center items-end lg:items-center'>
                    <button
                        onClick={() => handleNext()}
                        className='bg-blue-500 text-white font-normal h-12 px-4 rounded-xl whitespace-nowrap'>
                        Save & Next
                    </button>
                </div>
            </div>
            <div className='py-6'>
                <h2 className='text-lg font-normal mb-4'>Search Certifications</h2>
                <div className='relative mt-4'>
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
                    {showSuggestions && (
                        <div className='absolute bg-white border-2 left-0 border-gray-100 rounded-xl w-full lg:w-1/2 mt-1 max-h-56 overflow-y-auto z-20'>
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <div
                                        key={item.id}
                                        className='flex items-center gap-2 p-3 border border-b-0 cursor-pointer hover:bg-gray-100'
                                        onMouseDown={() => handleSuggestionSelect(item)}
                                    >
                                        <img className='w-8 h-auto' src={item.src} alt={item.text} />
                                        <span className='font-bold text-gray-800 ml-4'>{item.text}</span>
                                    </div>
                                ))
                            ) : (
                                <div className='text-md text-gray-400 p-4'>No matching Certification</div>
                            )}
                        </div>
                    )}
                </div>
                <h2 className='text-lg font-normal my-4'>Selected Certifications</h2>
                <div className='pt-2 flex flex-row gap-4 flex-nowrap lg:flex-wrap z-40 overflow-x-auto w-full appearance-none'>
                    {checkedItems.length > 0 ? checkedItems.map(item => (
                        <CheckboxItem
                            key={item.id}
                            text={item.text}
                            imageSrc={item.src}
                            checked={checkedItems.some(checkedItem => checkedItem.id === item.id)}
                            onChange={() => handleCheckboxChange(item.id)}
                        />
                    )) : (
                        <span className="text-md font-normal text-gray-400 ml-2">
                            No Certification Selected...
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Certifications;
