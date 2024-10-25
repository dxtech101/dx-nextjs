"use client"
import InputField from "@/components/InputField";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessfulToast from "@/components/toast/SuccessfulToast";
import { handleFormDataChange, validateForm } from "@/lib/helper";
import { resetPassword } from "@/lib/service/user.service";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const resetPasswordPage = ({ params }: { params: { temp_token: string; user_token: string } }) => {
    const router = useRouter();
    const { temp_token, user_token } = params;
    const [errors, setErrors] = useState({
        new_password: '',
        confirm_password: ''
    });
    const tokenVerificationData = {
        "user_id": 107,
        "token": "fdfdsfds"
    };
    const [formData, setFormData] = useState({
        new_password: '',
        confirm_password: '',
        token: user_token
    });
    console.log("axios", axios.defaults.baseURL);

    const tokenVerify = async () => {
        try {
            const response = await axios.post("users/token-verification/", tokenVerificationData);
            if (response && response.data.user) {
                console.log("User Data", response.data.user);
                toast.custom((t) => (
                    <SuccessfulToast t={t} message={"Logged in successfully"} />
                ));
                router.push('/developer/dashboard');
            }
        } catch (error: any) {
            console.error("Error resetting password", error);
            toast.custom((t) => (
                <ErrorToast t={t} message={error?.response?.data?.error} />
            ));
        }
    }
    // useEffect(() => {
    //     tokenVerify();
    // }, [])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm(formData, setErrors)) {
            return;
        }
        const signupData = new FormData();
        signupData.append('new_password', formData.new_password);
        signupData.append('confirm_password', formData.confirm_password);
        signupData.append('token', user_token);
        try {
            const response = await resetPassword(signupData);
            if (response && response.user) {
                console.log("User Data", response.user);
                toast.custom((t) => (
                    <SuccessfulToast t={t} message={"Logged in successfully"} />
                ));
                router.push('/developer/dashboard');
            }
        } catch (error: any) {
            console.error("Error resetting password", error);
            toast.custom((t) => (
                <ErrorToast t={t} message={error?.response?.data?.error || "An error occurred"} />
            ));
        }
    };

    return (
        <section className=" bg-white overflow-hidden text-black">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-md mx-auto">
                    <a className="mb-36 inline-block" href="#">
                        <img src="flaro-assets/logos/flaro-logo-black-xl.svg" alt="" />
                    </a>
                    <h2 className="mb-4 text-6xl md:text-4xl text-center font-bold font-heading tracking-px-n leading-tight">Welcome Back</h2>
                    <p className="mb-12 font-medium text-lg text-gray-600 leading-normal">Lorem ipsum dolor sit amet, to the con adipiscing. Volutpat tempor to the condim entum.</p>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                        <InputField
                            type="password"
                            label={"New Password"}
                            className="w-full"
                            value={formData.new_password}
                            onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                            id="new_password"
                            error={errors.new_password}
                            isRequired={true}
                        />
                        <InputField
                            type="password"
                            label={"Comfirm Password"}
                            value={formData.confirm_password}
                            onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                            id="confirm_password"
                            className="w-full"
                            error={errors.confirm_password}
                            isRequired={true}
                        />
                        <button
                            onClick={tokenVerify}
                            className="mb-8 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                            type="submit">
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default resetPasswordPage;
