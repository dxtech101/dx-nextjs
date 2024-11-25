import InputField from "@/components/InputField";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import { Clock2, Clock4, Clock7, Clock9 } from "lucide-react";

const TimePreference = () => {
    const options = [
        { value: 'salesforce_platform', label: 'Salesforce Platform' },
        { value: 'sales_cloud', label: 'Sales Cloud' },
        { value: 'service_cloud', label: 'Service Cloud' },
        { value: 'experience_cloud', label: 'Experience Cloud' },
        { value: 'marketing_cloud', label: 'Marketing Cloud' },
        { value: 'b2b_commerce_cloud', label: 'B2B Commerce Cloud' },
        { value: 'b2c_commerce_cloud', label: 'B2C Commerce Cloud' },
        { value: 'cpq', label: 'CPQ' },
    ];
    return (
        <div className="w-full h-fit relative px-10">
            <div className='w-full bg-white border-b border-gray-200 top-0 left-0 sticky py-6 flex flex-row justify-between items-center'>
                <span>
                    <h1 className='text-start text-3xl font-bold text-black'>
                        Job Preference
                    </h1>
                    <p className='pt-2 text-gray-400'>
                        Fill this form to get this job preference setup
                    </p>
                </span>
                <div className='flex flex-row gap-6 justify-center items-center'>
                    <button
                        className='bg-blue-500 text-bold text-white font-bold h-12 px-4 rounded-xl whitespace-nowrap'>
                        Save
                    </button>
                </div>
            </div>
            <div className="my-6 flex flex-col gap-6">
                <MultiSelectDropdown
                    id="timezone"
                    label={"Preferred Timezone"}
                    className="w-full"
                    options={[]}
                />
                <div>
                    <span className="text-sm font-bold text-gray-700 text-nowrap">
                        Available Hours / Week
                    </span>
                    <div className="flex flex-row gap-6 pt-2">
                        <div className="relative flex flex-row whitespace-nowrap items-center justify-center gap-4 py-4 px-6 w-fit rounded-xl bg-gray-100">
                            <input id="0-5" type="radio" className="w-full h-4 text-black border border-gray-400 rounded-xl" />
                            <label htmlFor="0-5" >0-5</label>
                            <div className="bottom-0 right-0">
                                <Clock2 className="w-8 h-8 text-gray-400" />
                            </div>
                        </div>
                        <div className="flex flex-row whitespace-nowrap items-center justify-center gap-4 py-4 px-6 w-fit rounded-xl bg-gray-100">
                            <input id="5-10" type="radio" className="w-full h-4 text-black border border-gray-400 rounded-xl" />
                            <label htmlFor="5-10">5-10</label>
                            <div className="bottom-0 right-0">
                                <Clock4 className="w-8 h-8 text-gray-400" />
                            </div>
                        </div>
                        <div className="flex flex-row whitespace-nowrap items-center justify-center gap-4 py-4 px-6 w-fit rounded-xl bg-gray-100">
                            <input id="10-20" type="radio" className="w-full h-4 text-black border border-gray-400 rounded-xl" />
                            <label htmlFor="10-20">10-20</label>
                            <div className="bottom-0 right-0">
                                <Clock7 className="w-8 h-8 text-gray-400" />
                            </div>
                        </div>
                        <div className="flex flex-row whitespace-nowrap items-center justify-center gap-4 py-4 px-6 w-fit rounded-xl bg-gray-100">
                            <input id="20-40" type="radio" className="w-full h-4 text-black border border-gray-400 rounded-xl" />
                            <label htmlFor="20-40">20-40</label>
                            <div className="bottom-0 right-0">
                                <Clock9 className="w-8 h-8 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
                <InputField placeHolder="For example ($5 - $10)" label="Desired Rates ($USD)" className="w-full" iconName="currency" />
                <MultiSelectDropdown label={"Salesforce Technologies"} className="w-full" options={options} id={""} />
            </div>
        </div>
    )
}

export default TimePreference
