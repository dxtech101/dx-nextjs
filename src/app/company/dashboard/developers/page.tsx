"use client"
import InputField from '@/components/InputField'
import { skillsDetails } from '@/constants/data'
import { getAllSalesforceSkills, getSkillsRelatedDevelopers } from '@/lib/service/portfolio.service'
import { XIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const SkillItem = ({ name, imageSrc }: any) => {
  const [checkedItem, setCheckedItem] = useState<any>();

  useEffect(() => {
    setCheckedItem(skillsDetails.find((item: any) => item.text === name))
  }, [])

  if (checkedItem?.bgColor) {
    return (
      <div className={`inline-flex gap-2 items-center min-w-max whitespace-nowrap ${checkedItem.bgColor} border ${checkedItem.borderColor} p-1 px-3 rounded-full relative z-0`}>
        <img className='w-auto h-4' src={imageSrc} alt={name} />
        <span className={`font-bold text-xs ${checkedItem.textColor}`}>
          {name}
        </span>
      </div>
    );
  }
};

const DeveloperSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<any>(null);
  const [selectedResources, setSelectedResources] = useState<any>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [initialItems, setInitialItems] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [checkedItems, setCheckedItems] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchDevelopers, setSearchDevelopers] = useState<any>([]);

  const querySkills: any = searchParams.get('skills');

  const handleSearch = async () => {
    try {
      setLoading(true);
      const { results: searchRelatedDevelopers } = await getSkillsRelatedDevelopers(querySkills);
      setSearchDevelopers(searchRelatedDevelopers);
    } catch (error) {
      console.error("Error fetching certifications:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (querySkills?.length > 0) {
      handleSearch();
    }
  }, [querySkills])

  const getSkillsDetails = async () => {
    try {
      setLoading(true);
      const { results: allSkills } = await getAllSalesforceSkills();
      setItems(allSkills);
      setInitialItems(allSkills)
    } catch (error) {
      console.error("Error fetching certifications:", error);
    } finally {
      setLoading(false);
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
        setSelectedResources(checkedItems.filter(i => i.sfid !== id).map((item: any) => item.name));
      }
    } else {
      setCheckedItems([...checkedItems, item]);
      setItems(items.filter((i: any) => i.sfid !== id));
      setSelectedResources([...selectedResources, item.name]);
      router.push(`/company/dashboard/developers/?skills=${[...selectedResources, item.name]}`)
    }
  };

  const handleSuggestionSelect = (item: any) => {
    setInputValue(item.text);
    handleCheckboxChange(item.sfid);
    setShowSuggestions(false);
    setInputValue("")
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


  const generateDeveloperName = (name: string) => {
    const nameArray = name.split(" ");
    if (nameArray.length === 3) {
      return nameArray[0] + " " + nameArray[1][0] + " " + nameArray[2];
    } else if (nameArray.length === 2) {
      return nameArray[0][0] + " " + nameArray[1];
    } else {
      return name;
    }
  }


  return (
    <div className='flex flex-col w-full'>
      <div className={`flex flex-col items-center ${searchDevelopers.length === 0 ? "justify-start" : "justify-center"} h-full w-full text-left gap-6 py-10 px-6 md:px-10`}>
        <div className='w-full h-full flex flex-col gap-4 items-center justify-between'>
          <h1 className="font-heading tracking-tight text-3xl md:text-6xl max-w-2xl mx-auto text-center font-medium mb-2">
            Search for Developer that best suits your needs 💼
          </h1>
          <div className='flex gap-2 w-full items-center justify-center'>
            <span className='hidden md:block font-medium text-xs whitespace-nowrap bg-purple-100 rounded-full px-4 border border-purple-800 text-purple-800 py-1'>
              500,000+ available developers
            </span>
            <span className='hidden md:block font-medium text-xs whitespace-nowrap bg-amber-100 rounded-full px-4 border border-amber-800 text-amber-800 py-1'>
              100,000+ available companies
            </span>
          </div>
        </div>

        <div className='mt-2 w-full flex flex-col md:flex-row items-center justify-center gap-4'>
          <div ref={containerRef} className='relative w-full lg:w-8/12'>
            <InputField
              className='w-full'
              iconName='search'
              placeHolder={checkedItems.length === 0 && `Search your skills (Ex. Salesforce, Mulesoft, Heroku)`}
              value={inputValue}
              onChange={(e: any) => setInputValue(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              checkedItems={checkedItems}
              handleSuggestionSelect={handleSuggestionSelect}
            />
            {showSuggestions && (
              <div className='absolute bg-white border-2 left-0 border-gray-200 rounded-xl shadow-sm w-full mt-1 max-h-48 overflow-y-auto z-20'>
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

          <button onClick={handleSearch} className='bg-blue-500 rounded-lg px-4 py-3 w-full lg:w-2/12 text-sm text-white whitespace-nowrap'>
            Find Resources
          </button>
        </div>
      </div>
      {loading ? <>
        <div className='flex flex-row gap-4 w-full'>
          <div className='w-full h-32 bg-gray-300 animate-pulse rounded-xl' />
          <div className='w-full h-32 bg-gray-300 animate-pulse rounded-xl' />
        </div>
      </> : <>
        {querySkills && (
          <div className="mb-6 sticky top-0 p-6 rounded-2xl border border-gray-300 bg-white z-10 flex flex-row gap-3 justify-between items-center">
            <span className='font-heading tracking-tight text-3xl font-medium flex flex-wrap gap-3'>
              Search Results for
              <div className='flex flex-wrap gap-2 items-center text-lg'>
                {querySkills.split(',').map((skill: any) => {
                  return (
                    <SkillItem key={skill} name={skill} imageSrc={skill.image_url} />
                  )
                })}
              </div>
            </span>
            <button
              onClick={() => {
                setSearchDevelopers([]);
                setCheckedItems([]);
                router.push(`/company/dashboard/developers`)
              }}
              className='absolute top-2 right-2 bg-red-200 text-red-800 border hover:border-red-600 text-xs font-medium py-1 px-2 rounded-full inline-flex items-center gap-1'>
              <div className='bg-red-700 p-1 rounded-full'>
                <XIcon className='w-3 h-3 text-red-100' />
              </div>
              Clear Search
            </button>
          </div>
        )}

        {searchDevelopers.length > 0 && <>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 items-center justify-between w-full'>
            {searchDevelopers.map((developer: any, index: any) => {
              const developerName = generateDeveloperName(developer?.developer_name);
              return (
                <div key={index} className={`bg-white flex flex-col justify-between relative rounded-xl p-6 gap-4 h-full`}>
                  <div className='absolute right-0 top-0 p-4 text-6xl text-gray-100 font-extrabold'>{index + 1}</div>
                  <div className='flex flex-row items-center gap-4'>
                    <div className='relative w-44 h-44 bg-gray-100 rounded-full overflow-hidden'>
                      <img
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                        alt=""
                        className='w-full h-full object-cover object-right-bottom rounded-xl'
                      />
                    </div>
                    <div className='flex flex-col gap-4 items-start'>
                      <span className='font-bold text-xl text-gray-800 '>{developerName}</span>
                      <div className='flex flex-row items-center gap-2'>
                        <span className='shadow-inner p-2 flex flex-col h-fit w-fit justify-center items-center gap-1 bg-purple-100 border border-purple-300 text-purple-900 rounded-xl'>
                          <span className='text-3xl'>🧑🏻‍💻</span>
                          <span className='text-xs font-bold'>{"Developer"}</span>
                        </span>
                        <span className='h-fit p-2 w-fit flex flex-col shadow-inner justify-center items-center gap-1 bg-amber-100 border border-amber-300 text-amber-900 rounded-xl'>
                          <span className='text-3xl'>🏆</span>
                          <span className='text-xs font-bold'>{5} Certification</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col gap-2 items-start w-full max-w-1/2'>
                    <div className='flex flex-row items-center justify-center gap-2 border w-full rounded-lg p-3'>
                      <span className='text-sm text-gray-500 font-medium'>
                        Expertise
                      </span>
                      <div className='flex flex-wrap gap-2 items-center col-span-2'>
                        {developer?.skills.slice(0, 3).map((skill: any, index: any) => {
                          return (
                            <SkillItem key={index} name={skill.skill_name} imageSrc={skill.image_url} />
                          )
                        })}
                      </div>
                    </div>
                    <div className='flex flex-row gap-2'>
                      <div className='flex flex-col items-center justify-center gap-2 border w-full rounded-lg p-3 '>
                        <span className='text-sm text-gray-500 font-medium'>
                          Integration
                        </span>
                        <div className='flex flex-wrap gap-2 items-center col-span-2'>
                          {developer?.skills.slice(0, 3).map((skill: any, index: any) => {
                            return (
                              <SkillItem key={index} name={skill.skill_name} imageSrc={skill.image_url} />
                            )
                          })}
                        </div>
                      </div>
                      <div className='flex flex-col items-center justify-center gap-2 border w-full rounded-lg p-3'>
                        <span className='text-sm text-gray-500 font-medium'>
                          Backend
                        </span>
                        <div className='flex flex-wrap gap-2 items-center col-span-2'>
                          {developer?.skills.slice(0, 3).map((skill: any, index: any) => {
                            return (
                              <SkillItem key={index} name={skill.skill_name} imageSrc={skill.image_url} />
                            )
                          })}
                        </div>
                      </div>
                      <div className='flex flex-col items-center justify-center gap-2 border w-full rounded-lg p-3'>
                        <span className='text-sm text-gray-500 font-medium'>
                          Frontend
                        </span>
                        <div className='flex flex-wrap gap-2 items-center col-span-2'>
                          {developer?.skills.slice(0, 3).map((skill: any, index: any) => {
                            return (
                              <SkillItem key={index} name={skill.skill_name} imageSrc={skill.image_url} />
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        router.push(`/company/dashboard/developers/${developer?.developer_sfid}`)
                      }}
                      className='w-full bg-blue-200 hover:bg-blue-400 text-blue-700 hover:text-blue-50 duration-200 text-center rounded-lg p-2 px-4 inline-flex justify-center items-center gap-2'>
                      View Profile
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </>}
      </>}

    </div>
  )
}

export default DeveloperSearch
