"use client"
import Modal from '@/components/modal/Modal';
import { PencilIcon, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import Certifications from '../onboarding/Certifications';
import DeveloperProfileCardHeader from './DeveloperProfileCardHeader';
import { getAllSalesforceCertifications } from '@/lib/service/portfolio.service';

const ProfileCertificationComponent = ({
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
                <img className='w-12 md:w-24' src={src} alt={name} />
                <span className='capitalize text-sm font-bold text-center text-gray-600 max-w-[7rem] line-clamp-2'>
                    {name.replace(/salesforce/i, '')}
                </span>
            </label>
        </div >
    )
}


const DeveloperProfileCertification = ({ certification, loading, updateDetails }: any) => {
    const [visibleCount, setVisibleCount] = useState(6);
    const [checkedItems, setCheckedItems] = useState();
    const [showAll, setShowAll] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loadingUI, setLoadingUI] = useState(false);

    const handleShowMore = () => {
        setShowAll(!showAll);
        setVisibleCount(showAll ? 6 : certification.length);
    };

    return (
        <>
            <div className='bg-gray-50 rounded-2xl w-full p-4 lg:p-6'>
                <DeveloperProfileCardHeader
                    headerIcon={<ShieldCheck />}
                    headerTitle={"Salesforce Certifications"}
                    headerContent={
                        <button
                            onClick={() => setShowModal(true)}
                            className='bg-gray-200 border border-gray-300 flex flex-row items-center justify-center gap-2 rounded-full text-gray-900 py-2 px-4 text-sm font-bold group'
                        >
                            <PencilIcon className="w-4 h-4 cursor-pointer ml-2" />
                            <span className="overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out opacity-0 w-0 group-hover:w-auto group-hover:opacity-100">
                                Edit
                            </span>
                        </button>
                    }
                />

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
                                    <ProfileCertificationComponent key={index} name={cert.name} src={cert.url} />
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
                    <div className='py-6 min-h-96 bg-[url(/noRecordBG2.png)] -m-6 px-10 bg-no-repeat bg-fixed bottom-0 bg-contain bg-bottom rounded-2xl'>
                        <Certifications type="edit" />
                    </div>
                </Modal>
            )}
        </>

    )
}

export default DeveloperProfileCertification
