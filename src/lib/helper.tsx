const validateRequiredField = (fieldValue: any, fieldName: string, newErrors: any) => {
    if (!fieldValue) {
        const normalCaseFieldName = fieldName
            .split('_')
            .join(' ')
            .replace(/^\w|\s\w/g, letter => letter.toUpperCase());
        newErrors[fieldName] = `${normalCaseFieldName} is required`;
    }
};

const validateEmail = (email: string, newErrors: any) => {
    if (email && !/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Email address is invalid.";
    }
};

const validatePasswordMatch = (password: string, confirmPassword: string, newErrors: any) => {
    if (password && password !== confirmPassword) {
        newErrors.confirm_password = "Passwords do not match";
    }
};

const validateLength = (fieldValue: string, minLength: number, fieldName: string, errorMessage: string, newErrors: any) => {
    if (fieldValue && fieldValue.length < minLength) {
        newErrors[fieldName] = errorMessage;
    }
};

const validateDate = (startDate:any, endDate:any, newErrors:any) => {        
    const start = new Date(startDate);
    const end = new Date(endDate);
    if(start && end && start > end){
        newErrors.start_date = "Start date should be less than End date";
    }
}

export const validateForm = (
    formData: any, 
    setErrors: (errors: any) => void
) => {
    const newErrors: any = {};
    
    Object.keys(formData).forEach(field => {
        validateRequiredField(formData[field], field, newErrors);
    });

    if ('email' in formData) {
        validateEmail(formData.email, newErrors);
    }

    if ('phone' in formData) {
        validateLength(formData.phone, 6, 'phone', "Phone Number must be at least 6 characters long", newErrors);
    }

    if ('new_password' in formData) {
        validateLength(formData.new_password, 6, 'new_password', "Password must be at least 6 characters long", newErrors);
    }

    if ('new_password' in formData && 'confirm_password' in formData) {
        validatePasswordMatch(formData.new_password, formData.confirm_password, newErrors);
    }

    if('start_date' in formData && 'end_date' in formData){
        validateDate(formData.start_date, formData.end_date, newErrors);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

export const handleFormDataChange = (e: any, setFormData: any, setErrors: any) => {
    const { id, value } = e.target;
    console.log("id::", id,"value::", value);
    
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
        <span className="flex flex-col gap-1 z-20">
            <span className="uppercase text-xs font-medium text-gray-500">{label}</span>
            <span className="line-clamp-1 hover:line-clamp-3">
                {content?.split(';').join(", ")}
            </span>
        </span>
    );
};


