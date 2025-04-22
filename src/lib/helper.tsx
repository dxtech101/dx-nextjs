const validateRequiredField = (fieldValue: any, fieldName: string, newErrors: any) => {
    if (!fieldValue) {
        const normalCaseFieldName = fieldName
            .split('_')
            .join(' ')
            .replace(/^\w|\s\w/g, letter => letter.toUpperCase());
        newErrors[fieldName] = `${normalCaseFieldName} is required`;
    }
};

const validateEmail = (email: string, fieldName: string, newErrors: any) => {
    if (email && !/\S+@\S+\.\S+/.test(email)) {
        newErrors[fieldName] = "Email address is invalid.";
    }
};

const validatePasswordMatch = (password: string, confirmPassword: string, newErrors: any) => {
    if (password && password !== confirmPassword) {
        newErrors.confirm_password = "Passwords do not match";
    }
};

const validateLength = (fieldValue: string, minLength: number, fieldName: string, ErrorMessage: string, newErrors: any, maxLength?: number) => {
    if (fieldValue) {
        if (fieldValue.length < minLength) {
            newErrors[fieldName] = ErrorMessage;
        } else if (maxLength && fieldValue.length > maxLength) {
            newErrors[fieldName] = ErrorMessage;
        }
    }
};

const validateDate = (startDate: any, endDate: any, newErrors: any) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start && end && start > end) {
        newErrors.start_date = "Start date should be less than End date";
    }
}

const validateTerms = (terms: boolean, fieldName: string, newErrors: any) => {
    if (!terms) {
        newErrors[fieldName] = "Please accept the terms and conditions";
    }
}

const validateIsAlpha = (fieldValue: string, fieldName: string, errorMessage: string, newErrors: any) => {
    const alphaRegex = /^[A-Za-z]+$/;

    if (fieldValue && !alphaRegex.test(fieldValue)) {
        newErrors[fieldName] = errorMessage;
    }
};


export const validateForm = (
    formData: any,
    errors: any,
    setErrors: (errors: any) => void
) => {
    const newErrors = {};

    Object.keys(errors).forEach(field => {
        if (field in formData && field in errors) {
            validateRequiredField(formData[field], field, newErrors);
        }
    });

    if ('email' in errors && 'email' in formData) {
        validateEmail(formData?.email, 'email', newErrors);
        validateLength(formData.email, 5, 'email', "Email should not exceed 30 characters", newErrors, 30);
    }

    if ('first_name' in errors && 'first_name' in formData) {
        validateLength(formData?.first_name, 2, 'first_name', "First name must be between 2 and 20 characters long", newErrors, 20);
        validateIsAlpha(formData?.first_name, 'first_name', "First name should contain only alphabets", newErrors);
    }

    if ('last_name' in errors && 'last_name' in formData) {
        validateLength(formData.last_name, 2, 'last_name', "Last name must be between 2 and 20 characters long", newErrors, 20);
        validateIsAlpha(formData.last_name, 'last_name', "Last name should contain only alphabets", newErrors);
    }

    if ('phone' in errors && 'phone' in formData) {
        validateLength(formData.phone, 6, 'phone', "Phone Number must be at least 6 characters long", newErrors);
    }

    if ('new_password' in errors && 'new_password' in formData) {
        validateLength(formData.new_password, 6, 'new_password', "Password must be at least 6 characters long", newErrors);
    }

    if ('new_password' in errors && 'confirm_password' in errors && 'new_password' in formData && 'confirm_password' in formData) {
        validatePasswordMatch(formData.new_password, formData.confirm_password, newErrors);
    }

    if ('start_date' in errors && 'end_date' in errors && 'start_date' in formData && 'end_date' in formData) {
        validateDate(formData.start_date, formData.end_date, newErrors);
    }

    if ('terms' in errors && 'terms' in formData) {
        validateTerms(formData.terms, 'terms', newErrors);
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};


export const handleFormDataChange = (e: any, setFormData: any, setErrors?: any) => {
    const { id, value } = e.target;

    setFormData((prev: any) => ({
        ...prev,
        [id]: value,
    }));
    setErrors((prev: any) => ({
        ...prev,
        [id]: ''
    }));
    return
};


export const InfoLabel = ({ label, content }: any) => {
    return (
        <span className="flex flex-col items-start gap-1 z-20">
            <span className="uppercase text-xs font-medium text-gray-500">{label}</span>
            <span className="line-clamp-1 hover:line-clamp-3 max-w-sm">
                {content?.split(';').join(", ")}
            </span>
        </span>
    );
};


