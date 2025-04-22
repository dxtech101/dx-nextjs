"use client"
import Dropdown from '@/components/Dropdown'
import InputField from '@/components/InputField'
import Modal from '@/components/modal/Modal'
import { getAllSalesforceSkills, getSkillsRelatedDevelopers, getUserPortfolio } from '@/lib/service/portfolio.service'
import { getCompanyProjects, getCompanyResources, getResourceRequest, shortlistResourceRequest } from '@/lib/service/projectResource.service'
import { BriefcaseBusiness, CodeIcon, DollarSign, Loader, LoaderCircle, MapPin, ShieldCheck, Users, XIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const SkillItem = ({ name }: any) => {
  const [checkedItem, setCheckedItem] = useState<any>();
  const initialItems = [
    { text: 'Salesforce', imageSrc: '/Salesforce.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
    { text: 'Mulesoft', imageSrc: '/Mulesoft.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
    { text: 'Heroku', imageSrc: '/heroku.png', bgColor: 'bg-purple-100', checkedColor: 'bg-purple-500', borderColor: 'border-purple-600', textColor: 'text-purple-900' },
    { text: 'Sales Cloud', imageSrc: '/sales-cloud.svg', bgColor: 'bg-green-100', checkedColor: 'bg-green-500', borderColor: 'border-green-600', textColor: 'text-green-800' },
    { text: 'Service Cloud', imageSrc: '/service-cloud.svg', bgColor: 'bg-pink-100', checkedColor: 'bg-pink-500', borderColor: 'border-pink-600', textColor: 'text-pink-600' },
    { text: 'Marketing Cloud', imageSrc: '/marketing-cloud.svg', bgColor: 'bg-orange-100', checkedColor: 'bg-orange-500', borderColor: 'border-orange-600', textColor: 'text-orange-400' },
    { text: 'B2B Commerce Cloud', imageSrc: '/commerce-cloud.svg', bgColor: 'bg-green-100', checkedColor: 'bg-green-500', borderColor: 'border-green-600', textColor: 'text-green-800' },
    { text: 'B2C Commerce Cloud', imageSrc: '/commerce-cloud.svg', bgColor: 'bg-green-100', checkedColor: 'bg-green-500', borderColor: 'border-green-600', textColor: 'text-green-800' },
    { text: 'Experience Cloud', imageSrc: '/Salesforce.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
    { text: 'Industry Cloud', imageSrc: '/Salesforce.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
    { text: 'Einstein Copilot', imageSrc: '/encop.webp', bgColor: 'bg-purple-100', checkedColor: 'bg-purple-500', borderColor: 'border-purple-600', textColor: 'text-purple-900' },
    { text: 'AI', imageSrc: '/encop.webp', bgColor: 'bg-purple-100', checkedColor: 'bg-purple-500', borderColor: 'border-purple-600', textColor: 'text-purple-900' },
  ];

  useEffect(() => {
    setCheckedItem(initialItems.find((item: any) => item.text === name))
  }, [])

  if (checkedItem?.bgColor) {
    return (
      <div className={`inline-flex gap-2 items-center min-w-max whitespace-nowrap ${checkedItem.bgColor} border ${checkedItem.borderColor} p-1 px-3 rounded-full relative z-0`}>
        <img className='w-auto h-4' src={checkedItem.imageSrc} alt={name} />
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
  const [selectedDeveloperSFID, setSelectedDeveloperSFID] = useState<any>('');
  const [selectedResources, setSelectedResources] = useState<any>([]);
  const [resource, setResource] = useState<any>();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [initialItems, setInitialItems] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [checkedItems, setCheckedItems] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [searchDevelopers, setSearchDevelopers] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [developerDetails, setDeveloperDetails] = useState<any>({});
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [projects, setProjects] = useState<any>([]);
  const accountSfid = useSelector((state: any) => state.userSalesforceID)

  const querySkills: any = searchParams.get('skills');
  const queryResource: any = searchParams.get('resource');
  const queryResourceId: any = searchParams.get('id');

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

  const getCompanyProjectsData = async () => {
    try {
      setModalLoading(true);
      const { results: contactProjects } = await getCompanyProjects(accountSfid);
      setProjects(
        contactProjects.map((project: any) => ({
          value: project.project_name,
          label: project.project_name,
        }))
      );
    } catch (error) {
      console.error("Error fetching certifications:", error);
    } finally {
      setModalLoading(false);
    }
  }

  const getCompanyResourcesData = async () => {
    try {
      setModalLoading(true);
      const { results: contactResources } = await getCompanyResources(accountSfid);
    } catch (error) {
      console.error("Error fetching certifications:", error);
    } finally {
      setModalLoading(false);
    }
  }

  const getDeveloperData = async (selectedDeveloperSFID: any) => {
    try {
      setModalLoading(true);
      const { results: developerData } = await getUserPortfolio(selectedDeveloperSFID);
      console.log("developerData::", developerData);

      setDeveloperDetails(developerData);
    } catch (error) {
      console.error("Error fetching certifications:", error);
    } finally {
      setModalLoading(false);
    }
  }

  useEffect(() => {
    if (selectedDeveloperSFID) {
      getDeveloperData(selectedDeveloperSFID);
    }
  }, [selectedDeveloperSFID])

  const getResourceRequestData = async () => {
    try {
      setModalLoading(true);
      const { results: contactResource } = await getResourceRequest(queryResourceId);
      console.log("contactResource::", contactResource);

      setResource(contactResource);
    } catch (error) {
      console.error("Error fetching certifications:", error);
    } finally {
      setModalLoading(false);
    }
  }

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

  const shortListResource = async (contactId: any) => {
    const shortlistResourceRequestData = {
      resource_request_id: queryResource,
      contact_id: contactId
    }
    console.log("shortlistResourceRequestData::", shortlistResourceRequestData);
    try {
      setModalLoading(true);
      const { results: contactResource } = await shortlistResourceRequest(shortlistResourceRequestData);
      console.log("contactResource::", contactResource);
      setResource(contactResource);
    } catch (error) {
      console.error("Error fetching certifications:", error);
    } finally {
      setModalLoading(false);
    }
  }

  useEffect(() => {
    if (openConfirmModal) {
      if (queryResource) {
        getResourceRequestData();
      }
      else {
        getCompanyResourcesData();
        getCompanyProjectsData();
      }
    }
  }, [openConfirmModal])

  console.log("resource::", resource);


  return (
    <div className='flex flex-col w-full'>
      <div className={`flex flex-col items-center ${searchDevelopers.length === 0 ? "justify-start" : "justify-center"} h-full w-full text-left gap-6 py-10 px-6 md:px-10`}>
        <div className='w-full h-full flex flex-col gap-4 items-center justify-between mb-24'>
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
          <div ref={containerRef} className='relative w-8/12'>
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

          <button onClick={handleSearch} className='bg-blue-500 rounded-lg px-4 py-3 text-sm text-white whitespace-nowrap'>
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
          <div className=" mb-6 sticky top-0 p-6 rounded-2xl border border-gray-300 bg-white z-10 flex flex-row gap-3 justify-between items-center">
            <span className='font-heading tracking-tight text-3xl font-medium flex flex-row gap-3'>
              Search Results for
              <div className='flex flex-row gap-2 items-center text-lg'>
                {querySkills.split(',').map((skill: any) => {
                  return (
                    <SkillItem key={skill} name={skill} />
                  )
                })}
              </div>
            </span>
            <button
              onClick={() => {
                setSearchDevelopers([]);
                router.push(`/company/dashboard/developers`)
              }}
              className='bg-red-200 text-red-800 border hover:border-red-600 text-xs font-medium py-1 px-2 rounded-full inline-flex items-center gap-1'>
              <div className='bg-red-700 p-1 rounded-full'>
                <XIcon className='w-3 h-3 text-red-100' />
              </div>
              Clear Search
            </button>
          </div>
        )}

        {searchDevelopers.length > 0 && <>
          <div className='grid grid-cols-2 gap-4 items-center justify-between w-full'>
            {searchDevelopers.map((developer: any, index: any) => {
              const developerName = generateDeveloperName(developer?.developer_name);
              return (
                <div key={index} className={`bg-white flex flex-col relative rounded-xl p-6 gap-2 h-full`}>
                  <div className='absolute right-0 top-0 p-4 text-6xl text-gray-100 font-extrabold'>{index + 1}</div>
                  <div className='flex flex-row gap-4'>
                    <div className='relative w-1/2 bg-gray-100 rounded-xl overflow-hidden'>
                      <img
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                        alt=""
                        className='w-full h-full object-cover rounded-xl'
                      />

                      <div className="absolute inset-0 bg-white/30 backdrop-blur-xl rounded-xl"></div>
                    </div>
                    <div className='flex flex-col gap-2 items-start w-full max-w-1/2'>
                      <div className='flex flex-col items-start'>
                        <span className='font-bold text-xl text-gray-800 '>{developerName}</span>
                      </div>
                      <div className='flex flex-wrap gap-2 items-center col-span-2 mb-2'>
                        {developer?.skills.map((skill: any, index: any) => {
                          return (
                            <SkillItem key={index} name={skill.skill_name} />
                          )
                        })}
                      </div>
                      <button
                        onClick={() => {
                          setSelectedDeveloperSFID(developer?.developer_sfid)
                          setOpenModal(true)
                        }}
                        className='w-full bg-blue-200 hover:bg-blue-400 text-blue-700 hover:text-blue-50 duration-200 text-center rounded-lg p-2 px-4 inline-flex justify-center items-center gap-2'>
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>}
      </>}

      {openModal && (
        <Modal
          header={"Developer Profile"}
          setModal={setOpenModal}
          isFooter={false}
          loading={loading}
          size={"md"}
        >
          <div className='w-full h-full flex flex-row items-center justify-center gap-4'>
            <img
              className="h-1/2 w-1/2 lg:h-1/4 lg:w-1/4 aspect-square rounded-full object-cover object-right relative"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
              alt="img"
            />
            <div className='flex flex-col gap-2 w-full'>
              <span className='text-3xl lg:text-4xl font-bold capitalize'>{developerDetails?.contact?.name}</span>
              <div className='flex flex-wrap gap-2 text-sm'>
                <span className='shadow-inner inline-flex items-center gap-2 bg-purple-100 border border-purple-300 text-purple-900 w-fit rounded-full py-0.5 px-4'>
                  <CodeIcon className='w-5 h-5' />
                  Senior Developer
                </span>
                <span className='inline-flex shadow-inner items-center gap-2 bg-amber-100 border border-amber-300 text-amber-900 w-fit rounded-full py-0.5 px-4'>
                  <ShieldCheck className='w-5 h-5' />
                  16 Certification
                </span>
                <span className='inline-flex items-center shadow-inner gap-2 bg-blue-100 border border-blue-300 text-blue-900 w-fit rounded-full py-0.5 px-4'>
                  <BriefcaseBusiness className='w-5 h-5' />
                  7+ Years Experience
                </span>
              </div>
            </div>
          </div>
          <div className='my-4 flex flex-row gap-2 items-center'>
            <span className='uppercase text-xs font-medium text-gray-500'>
              Skills
            </span>
            <span className='font-normal text-gray-800 '>
              <SkillItem name={developerDetails?.skill?.name} />
            </span>
          </div>
          <div className='my-4'>
            <span className='uppercase text-xs font-medium text-gray-500'>
              Work Experience
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, voluptates.
            </p>
          </div>
          {/* <div className='flex flex-row gap-4 items-center justify-between w-full'>
            <button
              onClick={() => {
                setOpenModal(false)
                shortListResource(developerDetails.contact.sfid)
                setOpenConfirmModal(true)
              }}
              className='bg-blue-500 text-white rounded-lg w-full p-2 px-4 inline-flex items-center justify-center gap-2'>
              Next
            </button>
            <button
              onClick={() => setOpenModal(false)}
              className='bg-gray-200 text-gray-400 rounded-lg w-full p-2 px-4 inline-flex items-center justify-center gap-2'>
              Cancel
            </button>
          </div> */}

        </Modal>
      )}

      {openConfirmModal && (
        <Modal
          header={"Resource Shortlisted"}
          setModal={setOpenConfirmModal}
          isFooter={false}
          loading={modalLoading}
          size={"md"}
        >
          {queryResource ? <>
            {modalLoading ? <>
              <div className='flex flex-row gap-2 items-center justify-center w-full p-10'>
                <LoaderCircle className='animate-spin h-6 w-auto mr-2' />
                Loading...
              </div>
            </> : <>
              {resource?.length > 0 && (
                <div className='w-full h-20 flex flex-col items-center justify-center gap-3'>
                  <span className='font-heading tracking-tight text-3xl font-medium flex flex-row gap-3'>
                    🎉{" "}Resource Shortlisted for {" "}
                    {resource[0]?.name}
                  </span>

                </div>
              )}
            </>}
          </> : <>
            <div className='w-full h-40 flex flex-col gap-3'>
              <Dropdown
                id={'project'}
                label={'Select a Project'}
                options={projects}
                onChange={() => console.log("onChange")}
              />
              <Dropdown
                id={'resource'}
                label={'Select Project Related Resource Request'}
                options={projects}
                onChange={() => console.log("onChange")}
              />
            </div>
          </>}
          <button
            onClick={() => { setOpenConfirmModal(false) }}
            className='bg-blue-500 text-white rounded-lg w-full p-2 px-4 inline-flex items-center justify-center gap-2'>
            {modalLoading ? "Loading..." : "Shortlist Resource"}
          </button>
        </Modal>
      )}
    </div>
  )
}

export default DeveloperSearch
