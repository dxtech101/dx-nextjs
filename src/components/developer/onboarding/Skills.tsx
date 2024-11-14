"use client"
import InputArea from '@/components/InputArea';
import InputField from '@/components/InputField'
import { onBoardingHandleNext, onBoardingHandlePrevious } from '@/feature/reducers/developerOnboarding';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const CheckboxItem = ({ text, imageSrc, bgColor, borderColor, textColor, checked, onChange, checkedColor }: any) => {
    return (
        <div className={`inline-flex gap-2 items-center ${bgColor} border ${borderColor} p-2 pl-4 rounded-full relative z-10 whitespace-nowrap min-w-max`}>
            <img className='w-auto h-6' src={imageSrc} alt={text} />
            <span className={`font-normal ${textColor}`}>
                {text}
            </span>
            <input
                type="checkbox"
                className={`w-6 h-6 ${textColor} bg-gray-100 border-2 ${borderColor} rounded-xl appearance-none `}
                checked={checked}
                onChange={onChange}
            />
            {checked && (
                <button
                    className={`absolute top-2.5 right-2.5 w-5 h-5 flex items-center justify-center ${checkedColor} rounded-full cursor-pointer`}
                    onClick={onChange}
                >
                    <X className="w-4 h-4" strokeWidth={2} color='white' />
                </button>
            )}
        </div>
    );
};

const Skills = () => {
    const initialItems = [
        { id: 1, text: 'Salesforce', imageSrc: '/Salesforce.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
        { id: 2, text: 'Mulesoft', imageSrc: '/mulesoft.webp', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
        { id: 3, text: 'Heroku', imageSrc: '/heroku.png', bgColor: 'bg-purple-100', checkedColor: 'bg-purple-500', borderColor: 'border-purple-600', textColor: 'text-purple-900' },
        { id: 4, text: 'Sales Cloud', imageSrc: '/sales-cloud.svg', bgColor: 'bg-green-100', checkedColor: 'bg-green-500', borderColor: 'border-green-600', textColor: 'text-green-800' },
        { id: 5, text: 'Service Cloud', imageSrc: '/service-cloud.svg', bgColor: 'bg-pink-100', checkedColor: 'bg-pink-500', borderColor: 'border-pink-600', textColor: 'text-pink-600' },
        { id: 6, text: 'B2B Commerce Cloud', imageSrc: '/commerce-cloud.svg', bgColor: 'bg-green-100', checkedColor: 'bg-green-500', borderColor: 'border-green-600', textColor: 'text-green-800' },
        { id: 7, text: 'Marketing Cloud', imageSrc: '/marketing-cloud.svg', bgColor: 'bg-orange-100', checkedColor: 'bg-orange-500', borderColor: 'border-orange-600', textColor: 'text-orange-400' },
        { id: 8, text: 'B2C Commerce Cloud', imageSrc: '/commerce-cloud.svg', bgColor: 'bg-green-100', checkedColor: 'bg-green-500', borderColor: 'border-green-600', textColor: 'text-green-800' },
        { id: 9, text: 'Experience Cloud', imageSrc: '/Salesforce.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
        { id: 10, text: 'Industry Cloud', imageSrc: '/Salesforce.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
        { id: 11, text: 'Einstein Copilot', imageSrc: '/encop.webp', bgColor: 'bg-purple-100', checkedColor: 'bg-purple-500', borderColor: 'border-purple-600', textColor: 'text-purple-900' },
    ];

    const [items, setItems] = useState(initialItems);
    const [checkedItems, setCheckedItems] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [filteredItems, setFilteredItems] = useState(initialItems);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const dispatch = useDispatch();

    const handleNext = () => {
        dispatch(onBoardingHandleNext({ stepperId: 2 }))
    }

    const handlePrevious = () => {
        dispatch(onBoardingHandlePrevious({ stepperId: 2 }))
    }

    const handleCheckboxChange = (id: number) => {
        const item = items.find(i => i.id === id);

        if (item) {
            setCheckedItems([...checkedItems, item]);
            setItems(items.filter(i => i.id !== id));
        } else {
            const uncheckedItem = checkedItems.find(i => i.id === id);
            if (uncheckedItem) {
                setItems([...items, uncheckedItem]);
                setCheckedItems(checkedItems.filter(i => i.id !== id));
            }
        }
    };

    useEffect(() => {
        if (inputValue.trim()) {
            const filtered = items.filter(item => item.text.toLowerCase().includes(inputValue.toLowerCase()));
            setFilteredItems(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [inputValue, items]);

    const handleSuggestionSelect = (item: any) => {
        setInputValue(item.text);
        handleCheckboxChange(item.id);
        setShowSuggestions(false);
        setInputValue("")
    }

    console.log("filteredItems", filteredItems);

    return (
        <>
            <div className='bg-white rounded-3xl border border-gray-300 overflow-clip w-full h-full relative px-5 lg:px-10'>
                <div className='w-full bg-white top-0 left-0 sticky py-6 flex flex-col gap-6 lg:flex-row justify-between items-start lg:items-center'>
                    <span>
                        <h1 className='text-start text-4xl md:text-5xl font-heading tracking-tight font-medium text-black'>
                            Skills Details
                        </h1>
                        <p className='pt-2 tracking-tight text-gray-600 max-w-sm'>
                            Enter the Core skills that you have
                        </p>
                    </span>
                    <div className='flex flex-row gap-4'>
                        <button onClick={handlePrevious} className='bg-gray-200 text-gray-400 text-normal font-normal h-12 px-6 rounded-xl'>Previous</button>
                        <button onClick={handleNext} className='bg-blue-500 text-normal text-white font-medium h-12 px-6 rounded-xl'>Save & Next</button>
                    </div>
                </div>
                <div className='py-8 z-10'>
                    <h2 className='text-lg font-normal'>Search Skills</h2>
                    {checkedItems.length !== initialItems.length ? (
                        <div className='relative mt-4'>
                            <InputField
                                className='w-full lg:w-1/2'
                                iconName='search'
                                placeHolder='Search your skills (Ex. Salesforce, Mulesoft, Heroku)'
                                value={inputValue}
                                onChange={(e: any) => setInputValue(e.target.value)}
                            />
                            {showSuggestions && (
                                <div className='absolute bg-white border-2 left-0 border-gray-200 rounded-xl shadow-sm w-full lg:w-1/2 mt-1 max-h-48 overflow-y-auto z-20'>
                                    {filteredItems.length > 0 ? (
                                        filteredItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className='flex items-center gap-2 p-3 border border-b-0 cursor-pointer hover:bg-gray-100'
                                                onMouseDown={() => handleSuggestionSelect(item)}
                                            >
                                                <img className='w-8 h-auto' src={item.imageSrc} alt={item.text} />
                                                <span className='font-normal text-gray-800 ml-4'>{item.text}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className='text-md text-gray-400 p-4'>No matching skills</div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <span className="text-md font-normal text-gray-400 ml-2 p-2">
                            No more skills available to select
                        </span>
                    )}
                </div>

                <h2 className='text-lg font-normal '>Selected Skills</h2>
                <div className='pt-4 flex flex-row gap-4 flex-nowrap lg:flex-wrap z-40 overflow-x-auto w-full appearance-none'>
                    {checkedItems.length > 0 ? checkedItems.map(item => (
                        <CheckboxItem
                            key={item.id}
                            text={item.text}
                            imageSrc={item.imageSrc}
                            bgColor={item.bgColor}
                            borderColor={item.borderColor}
                            textColor={item.textColor}
                            checkedColor={item.checkedColor}
                            checked={checkedItems.some(checkedItem => checkedItem.id === item.id)}
                            onChange={() => handleCheckboxChange(item.id)}
                        />
                    )) : (
                        <span className="text-md font-normal text-gray-400 ml-2">
                            No Skills Selected...
                        </span>
                    )}
                    <img src="/noRecordBG2.webp" alt="bgImage" className='absolute bottom-0 left-0 h-1/3 w-full object-cover object-left -z-0' />
                </div>
            </div>
        </>
    );
};

export default Skills;
