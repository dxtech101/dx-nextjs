"use client";
import InputArea from '@/components/InputArea';
import AssessmentLoader from '@/components/loaders/AssessmentLoader';
import { addUserProfile } from '@/feature/reducers/userProfile';
import { getAllQuestions, getAnswer, submitAnswer, submitAssessment } from '@/lib/service/developerTest.service';
import { ArrowLeft, ArrowRight, CircleAlert, DoorOpen, EllipsisVertical, HandHelping } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const page = () => {
    const [submitExam, setSubmitExam] = useState(false);
    const [testScreen, setTestScreen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dummyLoading, setDummyLoading] = useState(true);
    const [answerLoading, setAnswerLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [assessmentQuestions, setAssessmentQuestions] = useState<any>([]);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [showFullscreenWarning, setShowFullscreenWarning] = useState(true);
    const [formData, setFormData] = useState<any>({});
    const router = useRouter();
    const contactSfid = useSelector((state: any) => state.userSalesforceID)
    const userProfile = useSelector((state: any) => state.userProfile);
    const dispatch = useDispatch();

    const getAllQuestionsData = async () => {
        try {
            setLoading(true);
            const { results: questions } = await getAllQuestions();
            if (questions) {
                setAssessmentQuestions(questions);
                setTotalQuestions(questions.length);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    }

    const getQuestionRelatedAnswers = async () => {
        try {
            setAnswerLoading(true);
            const { results: answers } = await getAnswer(contactSfid, assessmentQuestions[currentQuestion]?.sfid);

            if (answers?.length > 0) {
                const currentAnswer = answers.find(
                    (ans: any) => ans.question.sfid === assessmentQuestions[currentQuestion]?.sfid
                );

                if (currentAnswer) {
                    setFormData((prev: any) => ({
                        ...prev,
                        [assessmentQuestions[currentQuestion]?.sfid]: currentAnswer.answer
                    }));
                }
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setAnswerLoading(false);
        }
    }

    useEffect(() => {
        getAllQuestionsData();
    }, [])

    useEffect(() => {
        if (assessmentQuestions.length > 0) {
            setDummyLoading(true);
            setTimeout(() => {
                setDummyLoading(false);
            }, 4000);
            getQuestionRelatedAnswers();
        }
    }, [assessmentQuestions, currentQuestion])

    useEffect(() => {
        const checkFullScreen = setInterval(() => {
            if (!document.fullscreenElement) {
                setShowFullscreenWarning(true);
            } else {
                setShowFullscreenWarning(false);
            }
        }, 1000);

        return () => clearInterval(checkFullScreen);
    }, []);


    const handleEnterFullscreen = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().then(() => {
                setShowFullscreenWarning(false);
            });
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleNext = async () => {
        const answerData = {
            "developer_id": contactSfid,
            "question_id": assessmentQuestions[currentQuestion]?.sfid,
            "answer": formData[assessmentQuestions[currentQuestion]?.sfid]
        }
        try {
            const response = await submitAnswer(answerData);
            if (response && (currentQuestion < totalQuestions)) {
                setCurrentQuestion(currentQuestion + 1);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleSubmitAssessment = async () => {
        try {
            const { results } = await submitAssessment(userProfile.id);
            if (results) {
                dispatch(addUserProfile(results));
                router.push('/developer/dashboard');
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    console.log("formData[assessmentQuestions[currentQuestion]?.sfid]", formData[assessmentQuestions[currentQuestion]?.sfid]);


    return (
        <div>
            {showFullscreenWarning && (
                <div className="fixed inset-0 bg-black flex flex-col gap-4 items-center justify-center z-50">
                    <span className='flex flex-row gap-4 items-center'>
                        <CircleAlert className="w-10 h-10 text-red-600" />
                        <h2 className="text-3xl font-bold text-red-600">
                            Fullscreen Mode is required
                        </h2>
                    </span>
                    <p className="text-white text-sm">
                        Please note that the assessment can only be done in full-screen mode
                    </p>
                    <button
                        onClick={handleEnterFullscreen}
                        className="bg-[#ffd80e] text-[#000000] rounded-lg px-6 py-1 border border-[#000000] text-sm mt-4"
                    >
                        Re-enter Fullscreen
                    </button>
                </div>
            )}


            {loading ? <AssessmentLoader /> : <>
                <div className={`sticky bg-white flex flex-row flex-wrap ${submitExam ? "justify-center" : "justify-between"}  items-center w-full border-b border-gray-200 py-3 mb-4 z-20`}>
                    {submitExam ? (
                        <></>
                    ) : (
                        <div className='p-6 flex flex-row items-center justify-between w-full'>
                            <div>
                                <div className='relative'>
                                    <span className='absolute text-5xl top-0 font-black text-black opacity-10'>{'</>'}</span>
                                    <h3 className="text-2xl font-bold">Question {currentQuestion}</h3>
                                </div>
                                <div className="flex flex-row gap-3 items-center justify-center w-full py-3">
                                    {Array.from({ length: totalQuestions }).map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-fit p-4 rounded-xl ${index + 1 === currentQuestion
                                                ? "bg-green-400"
                                                : "bg-gray-200"
                                                }`}
                                        >
                                            {index + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className='relative bg-gray-200 group h-12 px-3 rounded-xl'>
                                <EllipsisVertical className="w-5 h-5 text-black rounded-lg" />
                                <div className='hidden group-hover:block rounded-xl transition-all duration-300 ease-in-out border absolute z-50 top-full right-0 w-fit bg-white'>
                                    <div className="-top-2 z-20 absolute right-6 w-4 h-4 rounded-sm bg-white border-l border-t border-gray-200 transform rotate-45" />
                                    <button className='flex z-30 flex-row gap-2 items-center border-b p-3 px-5 hover:bg-gray-100'>
                                        <HandHelping className='w-5 h-5 text-black' />
                                        Help
                                    </button>
                                    <button
                                        onClick={() => {
                                            router.push("/developer/dashboard")
                                        }}
                                        className='flex z-30 flex-row gap-2 items-center w-full p-3 px-5 hover:bg-gray-100'>
                                        <DoorOpen className='w-5 h-5 text-black' />
                                        Exit
                                    </button>
                                </div>
                            </button>
                        </div>
                    )}
                </div>

                <div className='flex flex-col gap-2 p-6'>
                    {submitExam ? (
                        <div className='w-full h-full flex flex-col items-center justify-center gap-2 p-6'>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='relative'>
                                    <h3 className="text-2xl font-bold">{currentQuestion} / {totalQuestions} Questions attempted</h3>
                                </div>
                                <div className="flex flex-row gap-1 items-center justify-center w-full py-3">
                                    {Array.from({ length: totalQuestions }).map((_, index) => (
                                        <div key={index} className="w-fit p-4 rounded-xl bg-blue-400" >
                                            {index + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <p className='text-center text-lg'>
                                Are you sure you want to submit your exam?
                                <p className='text-sm text-gray-500'>
                                    You will not be able to edit your answers after submitting.
                                </p>
                            </p>

                            <div className='flex flex-row items-center justify-center gap-2 mt-4'>
                                <button
                                    type='button'
                                    onClick={() => setSubmitExam(false)}
                                    className='bg-red-500 text-sm text-white px-3 py-1 rounded-full inline-flex items-center gap-1'>
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmitAssessment}
                                    className='bg-blue-600 text-sm text-white px-3 py-1 rounded-xl inline-flex items-center gap-1'>
                                    Submit <ArrowRight className='h-4' />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-row gap-4 items-start h-full'>
                            <div className='flex-1 h-full flex-col gap-2'>
                                <p className="tracking-tight text-gray-500 text-sm">
                                    Question
                                </p>
                                <p dangerouslySetInnerHTML={{ __html: assessmentQuestions[currentQuestion]?.question }} />
                            </div>
                            <div className='flex-1 flex-col gap-2'>
                                <p className="tracking-tight text-gray-500 text-sm">
                                    Answer
                                </p>
                                <InputArea
                                    id={assessmentQuestions[currentQuestion]?.sfid}
                                    value={formData[assessmentQuestions[currentQuestion]?.sfid] || ""}
                                    onChange={(e: any) => {
                                        setFormData((prev: any) => ({
                                            ...prev,
                                            [assessmentQuestions[currentQuestion]?.sfid]: e.target.value
                                        }));
                                    }}
                                    className="w-full"
                                    placeHolder="Type your answer here"
                                    rows={"5"}
                                    disabled={answerLoading}
                                />
                            </div>
                        </div>
                    )}

                    {!submitExam && (
                        <div className='p-6 z-20 bg-white flex flex-row items-center justify-between w-full fixed bottom-0 left-0 border-t border-gray-200'>
                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestion === 1 || answerLoading}
                                className='bg-gray-300 text-sm text-gray-700 p-4 rounded-xl inline-flex items-center gap-1'>
                                <ArrowLeft className='h-4 w-4' /> Previous
                            </button>
                            <button
                                onClick={() => {
                                    if (currentQuestion === totalQuestions) {
                                        setSubmitExam(true);
                                    } else {
                                        handleNext();
                                    }
                                }}
                                disabled={answerLoading || dummyLoading}
                                className='bg-green-700 text-sm text-white p-4 rounded-xl inline-flex items-center gap-1'>
                                Save & Next <ArrowRight className='h-4' />
                            </button>
                        </div>
                    )}
                </div>
            </>}

        </div>
    );
};

export default page;
