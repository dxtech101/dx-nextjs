"use client"
import InputField from '@/components/InputField'
import { onBoardingHandleNext, onBoardingHandlePrevious } from '@/feature/developerOnboardingStepper/developerOnboarding';
import { Cross, X } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const CheckboxItem = ({ text, imageSrc, bgColor, borderColor, textColor, checked, onChange, checkedColor }: any) => {
    console.log("Checked::", checked);

    return (
        <div className={`inline-flex gap-2 items-center ${bgColor} border ${borderColor} p-2 pl-4 rounded-full relative`}>
            <img className='w-auto h-6' src={imageSrc} alt={text} />
            <span className={`font-bold ${textColor}`}>
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

    return (
        <>
            <div className='rounded-2xl w-full h-full relative px-10'>
                <div className='w-full bg-white border-b border-gray-200 top-0 left-0 sticky py-6 flex flex-row justify-between items-center'>
                    <span>
                        <h1 className='text-start text-3xl font-bold text-black'>
                            Skills Details
                        </h1>
                        <p className='pt-2 text-gray-400'>
                            Enter the Core skills that you have
                        </p>
                    </span>
                    <div className='flex flex-row gap-4 py-6'>
                        <button onClick={handlePrevious} className='bg-gray-200 text-gray-400 text-bold font-bold h-12 px-6 rounded-xl'>Previous</button>
                        <button onClick={handleNext} className='bg-blue-500 text-bold text-white font-bold h-12 px-6 rounded-xl'>Save & Next</button>
                    </div>
                </div>
                <>
                    <div className='pt-8'>
                        <h2 className='text-lg font-bold'>Selected Skills</h2>
                        <div className='flex flex-row flex-wrap gap-6 pt-6 items-center'>
                            {checkedItems?.length > 0 ? checkedItems.map((item: any) => (
                                <CheckboxItem
                                    key={item.id}
                                    text={item.text}
                                    imageSrc={item.imageSrc}
                                    bgColor={item.bgColor}
                                    borderColor={item.borderColor}
                                    textColor={item.textColor}
                                    checkedColor={item.checkedColor}
                                    checked={true}
                                    onChange={() => handleCheckboxChange(item.id)}
                                />
                            )) :
                                <div className='p-6 bg-gray-100 rounded-xl w-full relative overflow-clip text-center'>
                                    <img src="/noRecordBG2.webp" alt="" className='absolute h-full mix-blend-multiply w-full object-cover right-0 bottom-0 object-bottom opacity-25' />
                                    <span className='font-bold uppercase text-orange-500 text-2xl'>
                                        No Skills Selected
                                    </span>
                                </div>
                            }
                        </div>
                    </div>

                    <div className='pt-8'>
                        <h2 className='text-lg font-bold'>Available Skills</h2>
                        <div className='flex flex-row flex-wrap gap-6 pt-6 items-center'>
                            {items.length > 0 ? items.map((item) => (
                                <CheckboxItem
                                    key={item.id}
                                    text={item.text}
                                    imageSrc={item.imageSrc}
                                    bgColor={item.bgColor}
                                    borderColor={item.borderColor}
                                    textColor={item.textColor}
                                    checkedColor={item.checkedColor}
                                    checked={false}
                                    onChange={() => handleCheckboxChange(item.id)}
                                />
                            )) :
                                <div className='p-6 bg-gray-100 rounded-xl w-full relative overflow-clip text-center'>
                                    <img src="/noRecordBG2.webp" alt="" className='absolute h-full mix-blend-multiply w-full object-cover left-0 bottom-0 object-bottom opacity-25' />
                                    <span className='font-bold uppercase text-orange-500 text-2xl'>
                                        No More Skills Available
                                    </span>
                                </div>
                            }
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}

export default Skills;
