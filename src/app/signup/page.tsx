"use client";
import InputField from "@/components/InputField";
import Modal from "@/components/modal/Modal";
import SuccessModal from "@/components/modal/SuccessModal";
import TermsAndConditions from "@/components/TermsAndConditions";
import ErrorToast from "@/components/toast/ErrorToast";
import { handleFormDataChange, validateForm } from "@/lib/helper";
import axios from "axios";
import {
  ArrowLeft,
  Building2,
  CodeXml,
  LoaderCircle
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const page = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("Individual");
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTermsConditions, setShowTermsConditions] = useState(false);
  const [Salutation, setSalutation] = useState<any>("Mr");
  const [formData, setFormData] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    ...(selected === "company" && { company_name: "" }),
    role: selected,
    terms: false,
  });

  const queryParams = useSearchParams().get("tab");

  useEffect(() => {
    if (queryParams) {
      setSelected(queryParams === "company" ? "Company" : "Individual");
    }
  }, [queryParams]);

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    terms: "",
    ...(selected === "company" && { company_name: "" }),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(formData, errors, setErrors)) {
      return;
    }

    const signupData = new FormData();
    signupData.append("first_name", Salutation + " " + formData.first_name);
    signupData.append("last_name", formData.last_name);
    signupData.append("email", formData.email);
    signupData.append("phone", formData.phone);
    if (selected === "company") {
      signupData.append("company_name", formData.company_name);
      signupData.append("industry", formData.industry);
    }
    signupData.append("role", selected);
    signupData.append("medium", "email");
    try {
      setLoading(true);
      await axios.post("/users/enroll-user/", signupData);
      setSuccessModal(true);
    } catch (error: any) {
      toast.custom((t) => (
        <ErrorToast t={t} message={error?.response?.data?.error} />
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-white overflow-scroll lg:overflow-hidden min-h-screen p-8">
      <img
        className="absolute left-0 bottom-0 z-10 w-full h-full"
        src="https://static.shuffle.dev/components/preview/238eb578-e531-4cf4-a658-a1ff13c9b896/assets/public/flaro-assets/images/sign-up/gradient.svg"
        alt=""
      />
      <div className="relative z-10 flex flex-wrap justify-center min-h-screen items-center gap-6 m-0 xl:-m-8">
        <div className="relative w-full flex flex-col justify-start items-start lg:max-w-3xl xl:max-w-lg mx-auto text-black gap-4 xl:gap-10">
          <h1 className="text-3xl font-medium inline-flex gap-4 items-center">
            <Link href="/" className="p-3 border border-gray-900 rounded-full">
              <ArrowLeft />
            </Link>
            DX Digital
          </h1>
          <span className='flex flex-col gap-6'>
            <h2 className="text-5xl md:text-7xl font-medium leading-tight">
              Create an account & get started.
            </h2>
            <p className='text-gray-500 text-xl'>
              Unlock your potential with endless Salesforce opportunities tailored just for you.
            </p>
          </span>
        </div>
        <div className="relative w-full xl:w-1/2 flex flex-col justify-center items-center">
          <div className='shadow-inner bg-black/10 my-10 flex flex-row w-full lg:w-3/4 justify-around text-black items-center h-16 p-2 rounded-xl gap-2'>
            <button onClick={() => setSelected("Individual")} className={`text-sm lg:text-base ${selected === "Individual" ? "bg-white shadow-xl" : "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50"}  w-full h-full flex items-center justify-center gap-2 rounded-xl font-bold`}>
              <div className={`${selected === "Individual" ? "bg-blue-100" : "bg-gray-200"} bg-blue-100 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center`}>
                <CodeXml className='h-4 lg:h-6' color={selected === "Individual" ? "#3b82fc" : "#4b5563"} strokeWidth={2} />
              </div>
              Developer
            </button>
            <button onClick={() => setSelected("Company")} className={`text-sm lg:text-base ${selected === "Company" ? "bg-white shadow-xl" : "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50"} group w-full h-full flex items-center justify-center gap-2 rounded-xl font-bold`}>
              <div className={`${selected === "Company" ? "bg-blue-100" : "bg-gray-200 group-hover:bg-gray-100"} bg-blue-100 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center`}>
                <Building2 className='h-4 lg:h-6' color={selected === "Company" ? "#3b82fc" : "#4b5563"} strokeWidth={2} />
              </div>
              Company
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-3/4 flex flex-col gap-6"
          >
            <div className="flex flex-col lg:flex-row w-full justify-between gap-4">
              <InputField
                type="text"
                isRequired={true}
                label="First Name"
                value={formData.first_name}
                onChange={(e: any) =>
                  handleFormDataChange(e, setFormData, setErrors)
                }
                id="first_name"
                className="w-full"
                placeholder="Enter first name"
                error={errors.first_name}
                customTag={{ options: ["Mr", "Mrs", "Ms"] }}
                setSalutation={setSalutation}
                salutation={Salutation}
              />

              <InputField
                type="text"
                isRequired={true}
                label="Last Name"
                value={formData.last_name}
                onChange={(e: any) =>
                  handleFormDataChange(e, setFormData, setErrors)
                }
                id="last_name"
                className="w-full"
                placeholder="Enter last name"
                error={errors.last_name}
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {selected === "Company" && (
                <InputField
                  type="text"
                  isRequired={true}
                  label="Company Name"
                  value={formData.company_name}
                  onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                  id="company_name"
                  className="w-full"
                  placeholder="Enter company name"
                  error={errors.company_name}
                />
              )}
              <InputField
                type="text"
                label="Email Address"
                value={formData.email}
                isRequired={true}
                onChange={(e: any) =>
                  handleFormDataChange(e, setFormData, setErrors)
                }
                id="email"
                className="w-full"
                placeholder="Enter email address"
                error={errors.email}
              />
            </div>

            {/* <InputField
              type="password"
              label="Password"
              value={formData.password}
              isRequired={true}
              onChange={(e: any) =>
                handleFormDataChange(e, setFormData, setErrors)
              }
              id="password"
              className="w-full"
              placeholder="Enter Password"
              error={errors.password}
            /> */}

            <div className="flex flex-col w-full gap-2">
              <div className="w-full flex justify-between items-center">
                <label className="text-sm font-bold text-gray-700 text-nowrap">
                  Phone Number <span className="text-red-600"> *</span>
                </label>
                {errors.phone && (
                  <span className="text-xs text-red-500 font-bold">
                    {errors.phone}
                  </span>
                )}
              </div>
              <PhoneInput
                value={formData.phone}
                onChange={(value) =>
                  setFormData((prev: any) => ({ ...prev, phone: value }))
                }
                defaultCountry="IN"
                className={`h-12 pl-4 pr-4 w-full text-black border ${errors.phone
                  ? "border-red-400 border-2"
                  : "border-gray-400"
                  } bg-white rounded-xl`}
              />
            </div>

            <div className="flex flex-row items-center justify-between gap-2 w-full">
              <div className="flex flex-row items-center gap-2">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  checked={formData.terms}
                  onChange={(e: any) =>
                    handleFormDataChange(e, setFormData, setErrors)
                  }
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setShowTermsConditions(true)}
                    className="text-blue-600 font-semibold"
                  >
                    Terms and Conditions
                  </button>
                </label>
              </div>

              <div>
                {errors.terms && (
                  <span className="text-xs text-red-500 font-bold">
                    {errors.terms}
                  </span>
                )}
              </div>
            </div>

            <button
              className="mb-3 py-3 px-9 w-full text-white rounded-xl text-sm bg-indigo-600"
              type="submit"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoaderCircle className="animate-spin h-6 w-auto mr-2" />
                  Loading...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className="text-sm text-black float-start">
            Already have an account?{" "}
            <Link
              href={`/${selected === "Company" ? "company" : "developer"
                }/login`}
              className="font-bold text-blue-600"
            >
              SignIn
            </Link>
          </div>
        </div>
      </div>
      {successModal &&
        <SuccessModal
          email={formData.email}
          type="confirmation"
          onClose={() => router.push("/developer/login")}
        />
      }
      {showTermsConditions && (
        <Modal
          header="Terms and Conditions"
          setModal={setShowTermsConditions}
          size="md"
          submitButtonText="Accept"
          onSubmit={() => setShowTermsConditions(false)}
        >
          <TermsAndConditions />
        </Modal>
      )}
    </section>
  );
};

export default page;
