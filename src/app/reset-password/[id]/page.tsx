"use client"
import InputField from '@/components/InputField';
import ErrorToast from '@/components/toast/ErrorToast';
import { resetPassword } from '@/lib/service/user.service';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';

export default function ResetPassword({ params }: any) {
    const { id } = params;
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        token: id,
        newPassword: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    const validatePassword = (password: string) => {
        const validations = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
        setPasswordValidations(validations);
        return Object.values(validations).every(Boolean);
    };

    useEffect(() => {
        validatePassword(formData.newPassword);
    }, [formData.newPassword]);

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValidPassword = validatePassword(formData.newPassword);
        if (!isValidPassword) {
            setErrors(prev => ({ ...prev, newPassword: 'Password does not meet all requirements.' }));
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
            return;
        }

        try {
            setLoading(true);
            const response = await resetPassword({ token: id, password: formData.newPassword });
            if (response) {
                router.push("/developer/login");
            }
        } catch (error: any) {
            toast.custom((t) => (
                <ErrorToast t={t} message={error?.response?.data?.error} />
            ));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative bg-white h-screen w-full flex items-center justify-center p-6">
            <img className="absolute left-0 top-0 w-full h-screen object-cover" src="https://dx-assests.s3.amazonaws.com/assets/gradient.svg" alt="" />
            <div className="w-full xl:w-1/2 z-20">
                <h2 className="text-4xl font-medium leading-tight mb-4">
                    Set your Password
                </h2>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                    <InputField
                        type="password"
                        label="New Password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        id="newPassword"
                        error={errors.newPassword}
                        className="w-full"
                        isRequired={true}
                    />

                    <InputField
                        type="password"
                        label="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        id="confirmPassword"
                        error={errors.confirmPassword}
                        className="w-full"
                        isRequired={true}
                    />

                    {/* Password Strength Rules */}
                    <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700 space-y-2">
                        <p className="font-semibold mb-1">Your password must contain:</p>
                        {[
                            { label: 'At least 8 characters', key: 'length' },
                            { label: 'One uppercase letter (A-Z)', key: 'uppercase' },
                            { label: 'One lowercase letter (a-z)', key: 'lowercase' },
                            { label: 'One number (0-9)', key: 'number' },
                            { label: 'One special character (!@#$...)', key: 'specialChar' },
                        ].map(({ label, key }) => (
                            <p key={key} className={clsx("flex items-center gap-2", passwordValidations[key as keyof typeof passwordValidations] ? "text-green-600" : "text-gray-500")}>
                                <span className="h-2 w-2 rounded-full inline-block" style={{ backgroundColor: passwordValidations[key as keyof typeof passwordValidations] ? '#22c55e' : '#d1d5db' }} />
                                {label}
                            </p>
                        ))}
                    </div>

                    <button
                        disabled={loading}
                        className="cursor-pointer mt-2 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                        type="submit"
                    >
                        {loading ?
                            <div className="flex items-center justify-center">
                                <LoaderCircle className="animate-spin h-6 w-auto mr-2" />
                                Loading...
                            </div>
                            : "Continue"}
                    </button>
                </form>
            </div>
        </section>
    );
}
